import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    date:        { type: String, required: true },
    userName:    { type: String, default: '' },
    affiliation: { type: String, default: '' },
    gunType:     { type: String, default: '' },
    gunName:     { type: String, default: '' },
    gunNumber:   { type: String, default: '' },
    barcode:     { type: String, default: '', index: true },
    activity:    { type: String, default: '' },
    result:      { type: String, default: '' },
    inspector:   { type: String, default: '' },
    memo:        { type: String, default: '' },
}, { timestamps: true, collection: 'a06_gunjournal' });
export default mongoose.model('A06GunJournal', schema);