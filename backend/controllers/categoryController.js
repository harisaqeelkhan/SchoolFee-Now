const Category = require('../models/Category');

exports.getCategories = async (req, res, next) => {
  try {
    // Both admin and parents can get categories
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, type, description } = req.body;
    
    if (!name || name.trim() === '') {
      res.status(400);
      throw new Error('Category name cannot be empty');
    }

    const category = await Category.create({
      name,
      type,
      description,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
