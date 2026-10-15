import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    barcode:         { type: String, default: '', index: true },
    userName:        { type: String, required: true },
    gunType:         { type: String, default: '' },
    ammoType:        { type: String, default: '' },
    quantity:        { type: Number, default: 0 },
    transactionType: { type: String, enum: ['지급','반납','사용'], required: true },
    date:            { type: String, default: '' },
    contestTitle:    { type: String, default: '' },
    memo:            { type: String, default: '' },
}, { timestamps: true, collection: 'b03_ammo' });
export default mongoose.model('B03Ammo', schema);