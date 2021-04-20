import mongoose, { Schema, Document } from 'mongoose';
import User, { IUser } from './userModel';

export interface IListing extends Document {
    title: string;
    description: string;
    seller: IUser;
    price: number;
    item_count: number;
    urls: Array<string>;
    date_created: Date;
}

const ListingSchema = new Schema<IListing>({
    title: { type: String, required: true},
    description: { type: String, required: true},
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    price: { type: Number, required: true},
    item_count: { type: Number, required: true },
    urls: { type: [String], required: true},
    date_created: { type: Date, required: true}
})

ListingSchema.pre('save', function(next) {
    
    User.updateOne({_id: this.seller._id}, {$push: {listings: this._id}})
    next();
})

export default mongoose.model<IListing & Document>('Listing', ListingSchema);