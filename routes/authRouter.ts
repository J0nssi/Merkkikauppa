import { Router } from 'express';
import User, { IUser } from '../models/userModel';
import passport from '../passport-init'
import { CallbackError } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configuration'

const router = Router();

// GET
router.get('/user', passport.authenticate("jwt", {session: false}, (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
}));

// POST
router.post('/register', async (req, res) => {
    const { email, password, name, phone_number, city }: IUser = req.body;
    console.log("REGISTER REQUEST")
    // Validate
    User.findOne({ email: email}, (err: CallbackError, userMatch: IUser | null) => {
        if(err) {
            console.log('Database error occured checking if user exists')
        } else if (userMatch) {
            res.json({
                success: false,
                error: "User with email already exist error."
            })
        } else {
            const newUser = new User({
                'email': email,
                'password': password,
                'name': name,
                'phone_number': phone_number,
                'city': city
            })
            console.log("newUser: " + newUser)
            newUser.save((err, savedUser) => {
                console.log("savedUser: " + savedUser);
                if (err) return res.json(err);
			    return res.json(savedUser);
            })
        }
    })
});

router.post('/login', async (req, res) =>{
    passport.authenticate('local', (err: CallbackError, userMatch: IUser | null) => {
        if(err) {
            console.log(err)
        }
        if(userMatch) {
            const userForToken = {
                id: userMatch._id,
                email: userMatch.email
            }
            console.log('logged in ' + userMatch?.name);

            const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: "15m" })
            return res.cookie("token", token, {httpOnly: true}).json({message: "Login successful"}).status(200)

        } else {
            return res.json({ message: "Incorrect credentials"}).status(400);

        }
    })(req, res);
})

router.post('/logout', (req,res) => {
    if (req.cookies.token) {
		res.clearCookie("token");
		return res.json({ msg: 'logging you out' }).status(200);
	} else {
		return res.json({ msg: 'no user to log out!' }).status(400);
	}
})

export default router;