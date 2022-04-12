//external library
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

//Internal library
const { GoogleAuth } = require('../Model/googleLogin');
const { GithubAuth } = require('../Model/githubLogin');
const { FbAuth, FacebookAuth } = require('../Model/fbLogin');

//google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async function(accessToken, refreshToken, profile, done){

            console.log(profile.photos[0].value)
            const goolgeAuth = await new GoogleAuth({
                google_id : profile.id,
                name : profile.displayName,
                avatar : profile.photos[0].value,
                
            });
            await goolgeAuth.save();
            done(null,profile)
        }
    )
);

console.log(process.env.GITHUB_CLIENT_SECRET)



//GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback"
        },

        async function(accessToken, refreshToken, profile, done){

            const githubAuth = await new GithubAuth ({
                github_id : profile.id,
                name : profile.displayName,
                avatar : profile.photos[0].value,
            });
            await githubAuth.save();
    
            done(null,profile);
        }
    )
);

//Facebook Strategy
passport.use(
    new facebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback"
        },

        async function(accessToken, refreshToken, profile, done){

            const fbAuth = await new FacebookAuth ({
                github_id : profile.id,
                name : profile.displayName,
                avatar : profile.photos[0].value,
            });
            await fbAuth.save();
    
            done(null,profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
