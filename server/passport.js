const db = require("./db/queries.js");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");

const passport = require("passport");

const Strategy = new LocalStrategy(async (username, password, done) => {
    try {
        const { rows } = await db.usernameGet(username);
        const user = rows[0];

        if(!user) {
            return done(null, false, {msg: "Incorrect username"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return done(null, false, {msg: "Incorrect password"});
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
})

passport.use(Strategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];
        done(null, user);
    } catch(err) {
        done(err);
    }
});


module.exports = passport;