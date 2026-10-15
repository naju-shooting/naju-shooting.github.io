import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    barcode:      { type: String, default: '', index: true },
    userName:     { type: String, required: true },
    affiliation:  { type: String, default: '' },
    gunType:      { type: String, default: '' },
    gunName:      { type: String, default: '' },
    gunNumber:    { type: String, default: '' },
    transferDate: { type: String, default: '' },
    returnDate:   { type: String, default: '' },
    reason:       { type: String, default: '' },
    contestTitle: { type: String, default: '' },
    memo:         { type: String, default: '' },
}, { timestamps: true, collection: 'a03_transfers' });
export default mongoose.model('A03Transfer', schema);