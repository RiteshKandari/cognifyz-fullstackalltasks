require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes for authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.send('Login Successful!')
);

// Server Start
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


const axios = require('axios');

app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&daily=temperature_2m_max');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'API request failed' });
    }
});

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
});

app.use('/weather', limiter);

app.use(express.json()); // Body parsing middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
