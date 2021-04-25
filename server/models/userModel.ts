import { Schema, Document, model } from 'mongoose';
import { IListing } from './listingModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_SECRET } from '../configuration'
import refreshTokenModel from './refreshTokenModel';

export interface IUser extends Document {
    name: string;
    phone_number: string;
    email: string;
    city: string;
    password: string;
    listings: Array<IListing>;
    checkPassword(inputPassword: string): boolean;
    hashPassword(plainTextPassword: string): string;
    createAccessToken(): string;
    createRefreshToken(): string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true},
    phone_number: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    city: { type: String, required: true},
    password: { type: String, required: true},
    listings:{ type: [{type: Schema.Types.ObjectId, ref: 'Listing'}], required: true}
})

// Define schema methods
UserSchema.methods = {
	checkPassword: function (inputPassword: string){
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: (plainTextPassword: string): string => {
		return bcrypt.hashSync(plainTextPassword, 10)
	},
    createAccessToken: async function(){
        try {
            const userForToken = {
                id: this._id,
                email: this.email
            }
            return jwt.sign(userForToken, JWT_SECRET, { expiresIn: "15m" })

        } catch (error) {
            console.error(error);
            return;
        }
    },
    createRefreshToken: async function(){
        try {
            const userForToken = {
                id: this._id,
                email: this.email
            }
            let refreshToken = jwt.sign(userForToken, REFRESH_SECRET, { expiresIn: "1d" })
            await new refreshTokenModel({ refreshToken: refreshToken}).save();
            return refreshToken;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

UserSchema.pre('save', function(next) {
    if(!this.password) {
        console.log('=======NO PASSWORD PROVIDED=======')
		next();
    } else {
        this.password = this.hashPassword(this.password)
        next();
    }
})

export default model<IUser & Document>('User', UserSchema);