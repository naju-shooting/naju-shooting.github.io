import express from 'express';
import B05Release from '../models/B05Release.js';
const router = express.Router();

// GET /
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.barcode)      filter.barcode      = req.query.barcode;
        if (req.query.userName)     filter.userName     = { $regex: req.query.userName, $options: 'i' };
        if (req.query.contestTitle) filter.contestTitle = req.query.contestTitle;
        const docs = await B05Release.find(filter).sort({ createdAt: -1 }).lean();
        res.json({ ok: true, data: docs });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// POST /
router.post('/', async (req, res) => {
    try {
        const doc = await B05Release.create(req.body);
        res.status(201).json({ ok: true, message: '등록 완료', data: doc });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

// PUT /:id
router.put('/:id', async (req, res) => {
    try {
        const doc = await B05Release.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!doc) return res.status(404).json({ ok: false, error: '문서를 찾을 수 없습니다.' });
        res.json({ ok: true, message: '수정 완료', data: doc });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

// DELETE /:id
router.delete('/:id', async (req, res) => {
    try {
        const doc = await B05Release.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ ok: false, error: '문서를 찾을 수 없습니다.' });
        res.json({ ok: true, message: '삭제 완료' });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

export default router;
