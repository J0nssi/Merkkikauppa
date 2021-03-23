import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
    refreshToken: string
}

const RefreshTokenSchema: Schema = new Schema({
    refreshToken: {type: String, required: true}
})

export default mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema, "refreshTokens");