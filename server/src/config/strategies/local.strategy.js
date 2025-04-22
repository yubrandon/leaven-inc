const bcrypt = require("bcryptjs");
const pool = require("../../db/pool.js");
const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];
            //console.log(user);
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
    }
)
    

module.exports = function(passport) {
    passport.use(localStrategy);
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            const user = rows[0];
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}
