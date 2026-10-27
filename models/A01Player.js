import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    contestTitle: { type: String, default: '' },
    userName:     { type: String, required: true },
    affiliation:  { type: String, default: '' },
    birthDate:    { type: String, default: '' },
    contact:      { type: String, default: '' },
    gunType:      { type: String, default: '' },
    gunName:      { type: String, default: '' },
    gunNumber:    { type: String, default: '' },
    gunCaliber:   { type: String, default: '' },
    manufacturer: { type: String, default: '' },
    permitAgency: { type: String, default: '' },
    permitNumber: { type: String, default: '' },
    permitDate:   { type: String, default: '' },
    barcode:      { type: String, default: '', index: true },
    address:      { type: String, default: '' },
    remarks:      { type: String, default: '' },
    notices:      { type: Array, default: [] },
}, { timestamps: true, collection: 'a01_players' });
export default mongoose.model('A01Player', schema);
