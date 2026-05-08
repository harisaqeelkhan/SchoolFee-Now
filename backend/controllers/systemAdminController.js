const User = require('../models/User');
const School = require('../models/School');
const Student = require('../models/Student');

exports.getSystemStats = async (req, res, next) => {
  try {
    const schools = await School.find();
    const students = await Student.find().populate('schoolId').populate('parentId');
    const parents = await User.find({ role: 'parent' });
    const schoolAdmins = await User.find({ role: 'school_admin' });

    res.status(200).json({
      success: true,
      data: {
        schools,
        students,
        parents,
        schoolAdmins
      }
    });
  } catch (error) {
    next(error);
  }
};
