import User from '../models/user.js';
import AssignedReview from '../models/assignedReview.js';
import MyReview from '../models/myReviews.js';

export const home = async (req, res) => {
  try {
    let users = await User.find({});
    res.render('./assignwork', {
      users: users
    });
  } catch (error) {
    console.log('Error', error);
  }
};

export const createReview = async (req, res) => {
  try {
    let review = await AssignedReview.findOne({ fromUser: req.body.reviewer, toUser: req.body.recipient });

    if (review) {
      req.flash('success', 'Review already assigned to the selected assignee!');
      return res.redirect('back');
    }

    review = await AssignedReview.create({
      fromUser: req.body.reviewer,
      toUser: req.body.recipient
    });

    let user = await User.findById(req.body.reviewer);
    user.assignedReviews.push(review);
    await user.save();

    req.flash('success', 'Review assigned successfully');
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
  }
};
