import User from '../models/user.js';

// Render the Signin Page
export const Signin = (req, res) => {
  res.render('./signinPage');
};

// Render the SignUp Page
export const SignUp = (req, res) => {
  res.render('./signupPage');
};

// Get the sign up Data 
export const create = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      req.flash('success', 'User created successfully');
      return res.redirect('back');
    } else {
      req.flash('error', 'User already exists, try signing in');
      return res.redirect('back');
    }
  } catch (error) {
    console.log('Error', error);
    return res.redirect('back');
  }
};

// Sign in and create the session for the user
export const createSession = (req, res) => {
  return res.redirect('/');
};

export const destroySession = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log('Error while signing out');
      return res.redirect('back');
    }

    return res.redirect('/users/Signin');
  });
};
