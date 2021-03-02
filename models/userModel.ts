import { Schema, Document, model } from 'mongoose';
import { IListing } from './listingModel';
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    name: string;
    phone_number: string;
    email: string;
    city: string;
    password: string;
    listings: Array<IListing>;
    checkPassword(inputPassword: string): boolean;
    hashPassword(plainTextPassword: string): string;
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