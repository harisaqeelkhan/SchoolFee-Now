const Student = require('../models/Student');
const School = require('../models/School');
const FeeStructure = require('../models/FeeStructure');
const PaymentPlan = require('../models/PaymentPlan');
const Installment = require('../models/Installment');

exports.linkStudent = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    
    // Find student in DB by their internal school ID
    const student = await Student.findOne({ studentId });
    if (!student) {
      res.status(404);
      throw new Error('Student ID not found in system database');
    }

    // Link to parent
    student.parentId = req.user._id;
    await student.save();

    res.status(200).json({ success: true, data: student, message: 'Student linked successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getFeeStructure = async (req, res, next) => {
  try {
    // The param :id is the student's _id (MongoDB ObjectId)
    const student = await Student.findOne({ _id: req.params.id, parentId: req.user._id }).populate('schoolId');
    if (!student) {
      res.status(404);
      throw new Error('Student not found or not linked to your account');
    }

    // Find the fee structure for this school (assuming generic grade for now, or match by student logic)
    const feeStructures = await FeeStructure.find({ schoolId: student.schoolId._id });
    
    res.status(200).json({ success: true, data: feeStructures });
  } catch (error) {
    next(error);
  }
};

exports.submitApplication = async (req, res, next) => {
  try {
    const { studentId, originalFee, months } = req.body;

    if (![3, 6, 12].includes(months)) {
      res.status(400);
      throw new Error('Plan type must be 3, 6, or 12 months');
    }

    if (originalFee > 200000) {
      res.status(400);
      throw new Error('Credit Limit Exceeded: Maximum is PKR 200,000');
    }

    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    // Simple interest calculation mock (e.g. 5% for 3mo, 10% for 6mo, 15% for 12mo)
    const interestRate = months === 3 ? 0.05 : months === 6 ? 0.10 : 0.15;
    const totalRepayment = originalFee + (originalFee * interestRate);

    // Create Payment Plan
    const plan = await PaymentPlan.create({
      parentId: req.user._id,
      studentId: studentId,
      originalFee,
      totalRepayment,
      status: 'active'
    });

    // Log a pending transaction for the school (Proposal Requirement)
    const Transaction = require('../models/Transaction');
    await Transaction.create({
      transactionId: `TXN-BNPL-${Date.now()}`,
      senderId: req.user._id,
      amount: originalFee,
      type: 'fee',
      status: 'pending', // As per proposal: "logs a pending Transaction for the school"
      description: `BNPL Application for Student: ${student.studentId}`
    });

    // Generate Installments
    const monthlyAmount = totalRepayment / months;
    let currentDate = new Date();
    const installments = [];

    for (let i = 1; i <= months; i++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      const inst = await Installment.create({
        planId: plan._id,
        dueDate: new Date(currentDate),
        amount: monthlyAmount,
        status: 'scheduled'
      });
      installments.push(inst);
    }

    res.status(201).json({ 
      success: true, 
      data: { plan, installments },
      message: 'Application processed successfully' 
    });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentPlans = async (req, res, next) => {
  try {
    const plans = await PaymentPlan.find({ parentId: req.user._id }).populate('studentId', 'fullName studentId');
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
};

exports.getInstallments = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.planId) {
      const plan = await PaymentPlan.findOne({ _id: req.query.planId, parentId: req.user._id });
      if (!plan) {
        res.status(404);
        throw new Error('Payment plan not found');
      }
      query.planId = req.query.planId;
    } else {
      const plans = await PaymentPlan.find({ parentId: req.user._id });
      const planIds = plans.map(p => p._id);
      query.planId = { $in: planIds };
    }

    const installments = await Installment.find(query).sort({ dueDate: 1 });
    res.status(200).json({ success: true, data: installments });
  } catch (error) {
    next(error);
  }
};

exports.payInstallment = async (req, res, next) => {
  const mongoose = require('mongoose');
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const installmentId = req.params.id;
    const installment = await Installment.findById(installmentId).session(session);

    if (!installment) {
      res.status(404);
      throw new Error('Installment not found');
    }

    if (installment.status === 'paid') {
      res.status(400);
      throw new Error('Installment is already paid');
    }

    const plan = await PaymentPlan.findById(installment.planId).session(session);
    if (!plan || plan.parentId.toString() !== req.user._id.toString()) {
      res.status(404);
      throw new Error('Associated payment plan not found or unauthorized');
    }

    const Wallet = require('../models/Wallet');
    const wallet = await Wallet.findOne({ userId: req.user._id }).session(session);

    if (!wallet || wallet.balance < installment.amount) {
      res.status(400);
      throw new Error('Insufficient wallet balance');
    }

    wallet.balance -= installment.amount;
    await wallet.save({ session });

    installment.status = 'paid';
    await installment.save({ session });

    const remainingInstallments = await Installment.countDocuments({
      planId: plan._id,
      status: 'scheduled'
    }).session(session);

    if (remainingInstallments === 0) {
      plan.status = 'completed';
      await plan.save({ session });
    }

    const Transaction = require('../models/Transaction');
    await Transaction.create([{
      transactionId: `TXN-BNPL-PAY-${Date.now()}`,
      type: 'fee',
      amount: installment.amount,
      status: 'successful',
      senderId: req.user._id,
      description: `Paid BNPL installment for Plan ${plan._id}`
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: 'Installment paid successfully', data: installment });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
