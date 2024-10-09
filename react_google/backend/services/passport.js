import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { googleClientID, googleClientSecret } from '../config/keys.js';


export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        try {
          let user = await User.findOne({ googleId: id });

          if (user) {
            done(null, user);
          } else {
            user = new User({ googleId: id, displayName, email });
            await user.save();
            done(null, user);
          }
        } catch (err) {
          console.error(err);
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
