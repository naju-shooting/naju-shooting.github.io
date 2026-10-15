import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    barcode:      { type: String, default: '', index: true },
    userName:     { type: String, required: true },
    gunType:      { type: String, default: '' },
    gunNumber:    { type: String, default: '' },
    gunName:      { type: String, default: '' },
    checkOut:     { type: String, default: '' },
    checkIn:      { type: String, default: '' },
    contestTitle: { type: String, default: '' },
    memo:         { type: String, default: '' },
}, { timestamps: true, collection: 'a02_gunlogs' });
export default mongoose.model('A02GunLog', schema);