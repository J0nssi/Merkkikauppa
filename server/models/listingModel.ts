import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';

export interface IListing extends Document {
    title: string;
    description: string;
    seller: IUser | string;
    price: number;
    item_count: number;
    urls: Array<string>;
    date_created: Date;
}

const ListingSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    price: { type: Number, required: true},
    item_count: { type: Number, required: true },
    urls: { type: [String], required: true},
    date_created: { type: Date, required: true}
})

export default mongoose.model<IListing>('Listing', ListingSchema);