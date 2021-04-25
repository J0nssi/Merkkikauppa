import passport, { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel, { IUser } from './models/userModel';
import bcrypt from 'bcrypt';
import { CallbackError } from 'mongoose';
import { JWT_SECRET } from './configuration'
import passportJWT from 'passport-jwt';
import extractJwt from './middleware/extractJwt';

const JWTStrategy = passportJWT.Strategy;

//Function to initialize passport
const initialize = (passport: PassportStatic) => {

    //Serialize user with his id and store it in the session
    passport.serializeUser((user: any, done) => {
        console.log('=== serialize ... called ===');
        console.log(user); // the whole raw user object!
        console.log('---------');
        done(null, { _id: user._id });
    })

    //Deserialize user
    passport.deserializeUser((id: string, done) => {
        console.log('Deserialize ... called')
        userModel.findOne({ _id: id },
            (err: CallbackError, user: any) => {
                console.log('======= DESERIALIZE USER CALLED ======');
                console.log(user);
                console.log('--------------');
                done(null, user);
            }
        )
    })

    //Passport local strategy that uses the email field as the usernamefield and then executes an async verify function
    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        //const user = getUserByEmail(email);
        userModel.findOne({ 'email': email }).populate('listings').exec( async (err: CallbackError, userMatch: IUser | null) => {
            if (err) {
                return done(err);
            }
            //If user not found
            if (!userMatch) {
                //Return done function with no system error, no user found and a message
                return done(null, false, { message: 'No user with that email' });
            };
            try {
                if (await bcrypt.compare(password, userMatch.password)) {
                    //Correct password
                    return done(null, userMatch);
                } else {
                    //Incorrect password
                    done(null, false, { message: 'Password incorrect' });
                }
            } catch (e) {
                //Server error occured
                return done(e);
            }
        });

    }));

    passport.use(new JWTStrategy({ jwtFromRequest: extractJwt, secretOrKey: JWT_SECRET}, (jwt_payload, done) => {
         userModel.findOne({_id: jwt_payload.id}).exec((err: CallbackError, userMatch: IUser | null) => {
             if(userMatch && userMatch.id === jwt_payload.id){
               return done(null, userMatch)
             } else {
               return done(null, false, {
                    success: false,
                    message: "Token not matched"
               })
             }          
         })
      }));
};

// Initialize passport
initialize(passport);

export default passport;