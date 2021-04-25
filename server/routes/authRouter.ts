import { Router } from 'express';
import User, { IUser } from '../models/userModel';
import passport from '../passport-init'
import { CallbackError } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_SECRET } from '../configuration'
import extractJwt from '../middleware/extractJwt';
import RefreshToken, { IRefreshToken } from '../models/refreshTokenModel';

const router = Router();

// GET
router.get('/user', async (req, res) => {
    passport.authenticate("jwt", { session: false }, (err: CallbackError, userMatch: IUser | null, message: object) => {
        console.log(userMatch)
        if (userMatch) {
            let resUser = {
                id: userMatch.id,
                email: userMatch.email,
                name: userMatch.name,
                city: userMatch.city,
            }
            return res.status(200).json(resUser);
        } else {
            return res.status(401).json(message);
        }
    })(req, res);
});

router.get('/is-logged-in', async (req, res) => {
    let token = extractJwt(req);
    if (token) {
        let decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            return res.status(200).json(decoded);
        } else {
            if (req.cookies.token) {
                res.clearCookie("token");
            }
            return res.status(401).json({ message: "Invalid token." })
        }
    } else {
        return res.status(400).json({ message: "Not logged in. Try logging in again." })
    }
})

router.get("/refresh-token", (req, res) => {
    if (req && req.cookies && req.cookies.refreshToken) {
        let refreshToken: string = req.cookies.refreshToken;
        let payload: any;
        // Check if refresh token is valid
        try {
            payload = jwt.verify(refreshToken, REFRESH_SECRET);
        } catch (error) {
            //Refresh token expired. Remove it from database and clear the cookie
            RefreshToken.remove({ refreshToken: refreshToken })
            return res.status(401).clearCookie("refreshToken").clearCookie("token").json({ success: false, message: "Refresh token expired. Please log in again" });
        }
        // If the token is valid. Check if it exists in the database.
        RefreshToken.findOne({ refreshToken: refreshToken }).then((tokenMatch: IRefreshToken | null) => {
                //If the token is found, generate a new access token and send it to the front-end.
                if (tokenMatch) {
                    let userId: string = payload.id;
                    User.findOne({ _id: userId }).then(async (userMatch: IUser | null) => {
                        let newToken = await userMatch?.createAccessToken();
                        let newTokenPayload: any = jwt.verify(newToken!, JWT_SECRET);
                        res.status(200)
                        .cookie("token", newToken, { httpOnly: true })
                        .json({ 
                            success: true, 
                            message: "Access token successfully refreshed.", 
                            nextRefresh: newTokenPayload.exp
                        });
                    })
                } 
            }).catch((err) => {
                //if the token is not found return an error
                console.log(err);
                return res.status(401).clearCookie("refreshToken").clearCookie("token").json({ success: false, message: "Refresh token not found in database." })
            })
    }else {
        //Return error if no refresh token is found in request
        res.status(401).clearCookie("refreshToken").clearCookie("token").json({ success: false, message: "Refresh token not provided." })
    } 
    return res;
})

// POST
router.post('/register', async (req, res) => {
    const { email, password, name, phone_number, city }: IUser = req.body;
    console.log("REGISTER REQUEST")
    // Validate
    User.findOne({ email: email }, (err: CallbackError, userMatch: IUser | null) => {
        if (err) {
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

router.post('/login', async (req, res) => {
    passport.authenticate('local', async (err: CallbackError, userMatch: IUser | null) => {
        if (err) {
            console.log(err)
        }
        if (userMatch) {
            const token = await userMatch.createAccessToken();
            const refreshToken = await userMatch.createRefreshToken();

            let tokenPayload: any = jwt.verify(token!, JWT_SECRET);

            console.log('logged in ' + userMatch?.name);
            return res.cookie("token", token, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .status(200)
            .json({ 
                success: true,
                message: "Login successful",
                nextRefresh: tokenPayload.exp
            })

        } else {
            return res.status(400).json({ success: false, message: "Incorrect credentials" });

        }
    })(req, res);
})

router.post('/logout', (req, res) => {
    if (req.cookies.token) {
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.status(200).json({ msg: 'Logging you out' });
    } else {
        return res.status(400).json({ msg: 'No user to log out!' });
    }
})

export default router;