import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
    title: string;
    seller: {
        name: string;
        id: string;
    }
    price: number;
    urls: Array<string>;
}

const ListingSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true},
    seller:{
        name: { type: String, required: true, unique: true},
        id: { type: String, required: true, unique: true}
    },
    price: { type: Number, required: true, unique: true},
    urls: { type: [String], required: true, unique: true},
})

export default mongoose.model<IListing>('Listing', ListingSchema);