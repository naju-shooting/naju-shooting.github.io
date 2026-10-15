import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    userName:     { type: String, required: true },
    userBirth:    { type: String, default: '' },
    affiliation:  { type: String, default: '' },
    gunType:      { type: String, default: '' },
    gunName:      { type: String, default: '' },
    gunNumber:    { type: String, default: '' },
    gunCaliber:   { type: String, default: '' },
    ammoQty:      { type: Number, default: 0 },
    barcode:      { type: String, default: '', index: true },
    contact:      { type: String, default: '' },
    contestTitle: { type: String, default: '' },
    memo:         { type: String, default: '' },
}, { timestamps: true, collection: 'b01_players' });
export default mongoose.model('B01Player', schema);