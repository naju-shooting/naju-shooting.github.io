import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ── 초기화 및 환경설정 ──────────────────────────────────────────────────────────
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── 기본 미들웨어 ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Legacy path redirect middleware ──────────────────────────────────────────────
const LEGACY_REDIRECT_TARGET = 'https://naju-shooting-github-io-6.onrender.com';
const legacyPaths = [
  '/AAABBB.html','/AAA','/A01','/A02','/A03','/A04','/A05','/A06',
  '/BBB','/B01','/B02','/B03','/B04','/B05'
];
app.get(legacyPaths, (req, res) => {
  res.redirect(LEGACY_REDIRECT_TARGET);
});
app.use(express.static(path.join(__dirname, 'public')));  // HTML 정적 파일 서빙

// ── 라우터 임포트 (A01 ~ A06, B01 ~ B04) ────────────────────────────────────────
import routeA01 from './routes/A01Players.js';
import routeA02 from './routes/A02GunLogs.js';
import routeA03 from './routes/A03Transfers.js';
import routeA04 from './routes/A04Ammo.js';
import routeA05 from './routes/A05Documents.js';
import routeA06 from './routes/A06GunJournal.js';

import routeB01 from './routes/B01Players.js';
import routeB02 from './routes/B02GunLogs.js';
import routeB03 from './routes/B03Ammo.js';
import routeB04 from './routes/B04Documents.js';
import routeB05 from './routes/B05Releases.js';

// ── API 라우트 마운트 ─────────────────────────────────────────────────────────
app.use('/api/a01', routeA01);
app.use('/api/a02', routeA02);
app.use('/api/a03', routeA03);
app.use('/api/a04', routeA04);
app.use('/api/a05', routeA05);
app.use('/api/a06', routeA06);

// B시리즈 라우터 마운트
app.use('/api/b01', routeB01);
app.use('/api/b02', routeB02);
app.use('/api/b03', routeB03);
app.use('/api/b04', routeB04);
app.use('/api/b05', routeB05);

// ── 페이지 로컬스토리지 백업 엔드포인트 (/api/savePage) ──────────────────────────
const pageStorageMap = new Map();
app.post('/api/savePage', (req, res) => {
    try {
        const { page, data } = req.body;
        if (!page) return res.status(400).json({ ok: false, error: 'page 이름이 필요합니다.' });
        pageStorageMap.set(page, { data, savedAt: new Date().toISOString() });
        res.json({ ok: true, message: '페이지 데이터 임시 저장 완료', page });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});
app.get('/api/savePage/:page', (req, res) => {
    const item = pageStorageMap.get(req.params.page);
    if (!item) return res.status(404).json({ ok: false, error: '저장된 페이지 데이터가 없습니다.' });
    res.json({ ok: true, page: req.params.page, ...item });
});

// ── 헬스체크 ──────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        status: 'running',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        time: new Date().toISOString()
    });
});

// ── 404 핸들러 (API) ──────────────────────────────────────────────────────────
app.use('/api', (req, res) => {
    res.status(404).json({ ok: false, error: `엔드포인트를 찾을 수 없습니다: ${req.path}` });
});

// ── 전역 에러 핸들러 ──────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('[서버 오류]', err);
    res.status(500).json({ ok: false, error: '서버 내부 오류', detail: err.message });
});

// ── MongoDB 연결 후 서버 시작 ─────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shooting-range';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log(`[DB] MongoDB 연결 성공`);
        app.listen(PORT, () => {
            console.log(`[서버] http://localhost:${PORT} 에서 실행 중`);
            console.log(`[헬스] http://localhost:${PORT}/api/health`);
        });
    })
    .catch(err => {
        console.error('[DB] MongoDB 연결 실패:', err.message);
        process.exit(1);
    });