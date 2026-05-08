const Notification = require('../models/Notification');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404);
      throw new Error('Notification not found');
    }
    
    if (notification.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    notification.readStatus = true;
    await notification.save();

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, readStatus: false },
      { $set: { readStatus: true } }
    );
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (userId, title, message, type, relatedTransactionId = null) => {
  try {
    await Notification.create({
      userId,
      title,
      message,
      type,
      relatedTransactionId
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};
