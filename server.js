/**
 * server.js - 사격장 통합관리 시스템 메인 서버
 *
 * 실행: node server.js
 * 환경: .env 파일에 MONGODB_URI, PORT 설정 (또는 process.env 직접 지정)
 */

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
app.use(express.static(path.join(__dirname, 'public')));  // HTML 정적 파일 서빙

// ── 라우터 임포트 (A01 ~ A06, B01 ~ B04) ────────────────────────────────────────
// ※ 주의: 실제 routes 폴더 내 파일명과 확장자(.js)가 완전히 일치해야 합니다.
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
// eslint-disable-next-line no-unused-vars
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
