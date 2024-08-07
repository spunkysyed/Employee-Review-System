import mongoose from 'mongoose';

const assignedReviewSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const AssignedReview = mongoose.model('AssignedReview', assignedReviewSchema);

export default AssignedReview;
