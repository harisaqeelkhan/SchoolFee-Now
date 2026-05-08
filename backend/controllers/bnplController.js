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
