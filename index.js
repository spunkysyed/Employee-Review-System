import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import {setFlash} from './config/notymiddleware.js';
import connectToDatabase from './config/mongoose.js';
import passportLocal from './config/passport-local-strategy.js';
import routes from './routes/index.js';

const app = express();

app.use(express.static('./assets'));
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoStore is used to store the session cookie in the DB
app.use(session({
    name: 'employee_review',
    // TODO: Change the secret before deployment
    secret: 'test',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(setFlash);

// Use express router
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is up on the port: 3000');
    connectToDatabase();
});
