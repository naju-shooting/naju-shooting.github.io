import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    docNumber:    { type: String, default: '' },
    docTitle:     { type: String, required: true },
    docType:      { type: String, default: '' },
    issuedDate:   { type: String, default: '' },
    expiryDate:   { type: String, default: '' },
    issuer:       { type: String, default: '' },
    holder:       { type: String, default: '' },
    contestTitle: { type: String, default: '' },
    status:       { type: String, enum: ['유효','만료','갱신중'], default: '유효' },
    memo:         { type: String, default: '' },
}, { timestamps: true, collection: 'b04_documents' });
export default mongoose.model('B04Document', schema);