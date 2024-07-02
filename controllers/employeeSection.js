import User from '../models/user.js';
import AssignedReview from '../models/assignedReview.js';
import MyReview from '../models/myReviews.js';

export const home = async (req, res) => {
  try {
    let users = await User.find({});
    res.render('./employeeSection', {
      users: users
    });
  } catch (error) {
    console.log('Error', error);
  }
};

export const update = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (user.name === req.body.name && user.email === req.body.email && user.password === req.body.password) {
      req.flash('success', 'No values updated');
      return res.redirect('back');
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();
    req.flash('success', 'User updated successfully');
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
    return res.redirect('back');
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    await user.deleteOne();

    await AssignedReview.deleteMany({ fromUser: req.params.id });

    let myReviewIds = await MyReview.find({ fromUser: req.params.id });

    for (let review of myReviewIds) {
      let userId = review.toUser;
      await User.findByIdAndUpdate(userId, { $pull: { myReviews: review.id } });
      await review.deleteOne();
    }

    req.flash('success', 'User deleted successfully');
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
    return res.redirect('back');
  }
};

export const makeAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user.permission = 'admin';
    await user.save();
    req.flash('success', 'User promoted to admin');
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
    return res.redirect('back');
  }
};

export const removeAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user.permission = 'employee';
    await user.save();
    req.flash('success', 'User removed as admin');
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
    return res.redirect('back');
  }
};
