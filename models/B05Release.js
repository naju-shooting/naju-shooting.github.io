import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    barcode:      { type: String, default: '', index: true },
    userName:     { type: String, required: true },
    affiliation:  { type: String, default: '' },
    gunType:      { type: String, default: '' },
    gunName:      { type: String, default: '' },
    gunNumber:    { type: String, default: '' },
    ammoType:     { type: String, default: '' },
    ammoQty:      { type: Number, default: 0 },
    releaseDate:  { type: String, default: '' },
    confirmedBy:  { type: String, default: '' },
    contestTitle: { type: String, default: '' },
    memo:         { type: String, default: '' },
}, { timestamps: true, collection: 'b05_releases' });
export default mongoose.model('B05Release', schema);