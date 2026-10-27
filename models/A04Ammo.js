import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    contestTitle:    { type: String, default: '' },
    barcode:         { type: String, default: '', index: true },
    name:            { type: String, default: '' },
    userName:        { type: String, default: '' },
    date:            { type: String, default: '' },
    time:            { type: String, default: '' },
    purpose:         { type: String, default: '훈련' },
    gunType:         { type: String, default: '' },
    type:            { type: String, default: '' },
    ammoType:        { type: String, default: '' },
    outQty:          { type: Number, default: 0 },
    inQty:           { type: Number, default: 0 },
    currStock:       { type: Number, default: 0 },
    memo:            { type: String, default: '' }
}, { timestamps: true, collection: 'a04_ammo', strict: false });
export default mongoose.model('A04Ammo', schema);
