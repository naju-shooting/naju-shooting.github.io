/**
 * api.js - 사격장 통합관리 시스템 공통 API 통신 모듈
 *
 * 사용법: 각 HTML 파일 </body> 바로 위에 추가하세요.
 *   <script src="/js/api.js"></script>
 *
 * 이후 HTML 내 <script> 블록에서 전역 함수로 바로 호출:
 *   await A01_registerPlayer({ userName:'홍길동', gunType:'공기권총', ... })
 */

const API_BASE = '';  // 같은 서버: 빈 문자열. 외부 서버: 'http://localhost:3000'

// ── 내부 공통 유틸 ────────────────────────────────────────────────────────────

async function _post(endpoint, payload) {
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || 'HTTP ' + res.status);
    return data;
}

async function _get(endpoint, params) {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(API_BASE + endpoint + qs);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
    return data;
}

async function _put(endpoint, payload) {
    const res = await fetch(API_BASE + endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
    return data;
}

async function _del(endpoint) {
    const res = await fetch(API_BASE + endpoint, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
    return data;
}

// ── A01 선수등록관리 /api/a01/players ────────────────────────────────────────
// 필드: userName, affiliation, birthDate, contact, gunType, gunName,
//       gunNumber, gunCaliber, manufacturer, permitAgency, permitNumber,
//       permitDate, barcode, address, remarks
async function A01_registerPlayer(d)   { return _post('/api/a01/players', d); }
async function A01_getPlayers(f)       { return _get('/api/a01/players', f); }
async function A01_updatePlayer(id, d) { return _put('/api/a01/players/' + id, d); }
async function A01_deletePlayer(id)    { return _del('/api/a01/players/' + id); }

// ── A02 일일사용총기관리 /api/a02/gunlogs ────────────────────────────────────
// 필드: barcode, userName, gunType, gunNumber, gunName, checkOut, checkIn,
//       contestTitle, memo
async function A02_addGunLog(d)        { return _post('/api/a02/gunlogs', d); }
async function A02_getGunLogs(f)       { return _get('/api/a02/gunlogs', f); }
async function A02_updateGunLog(id, d) { return _put('/api/a02/gunlogs/' + id, d); }
async function A02_deleteGunLog(id)    { return _del('/api/a02/gunlogs/' + id); }

// ── A03 일시관리전환총기 /api/a03/transfers ───────────────────────────────────
// 필드: barcode, userName, affiliation, gunType, gunName, gunNumber,
//       transferDate, returnDate, reason, contestTitle, memo
async function A03_addTransfer(d)        { return _post('/api/a03/transfers', d); }
async function A03_getTransfers(f)       { return _get('/api/a03/transfers', f); }
async function A03_updateTransfer(id, d) { return _put('/api/a03/transfers/' + id, d); }
async function A03_deleteTransfer(id)    { return _del('/api/a03/transfers/' + id); }

// ── A04 관내용 탄약관리 /api/a04/ammo ────────────────────────────────────────
// 필드: barcode, userName, gunType, ammoType, quantity,
//       transactionType('입고'|'출고'), date, contestTitle, memo
async function A04_addAmmoRecord(d)        { return _post('/api/a04/ammo', d); }
async function A04_getAmmoRecords(f)       { return _get('/api/a04/ammo', f); }
async function A04_updateAmmoRecord(id, d) { return _put('/api/a04/ammo/' + id, d); }
async function A04_deleteAmmoRecord(id)    { return _del('/api/a04/ammo/' + id); }

// ── A05 문서관리대장(관내) /api/a05/documents ─────────────────────────────────
// 필드: docNumber, docTitle, docType, issuedDate, expiryDate, issuer,
//       holder, status('유효'|'만료'|'갱신중'), memo
async function A05_addDocument(d)        { return _post('/api/a05/documents', d); }
async function A05_getDocuments(f)       { return _get('/api/a05/documents', f); }
async function A05_updateDocument(id, d) { return _put('/api/a05/documents/' + id, d); }
async function A05_deleteDocument(id)    { return _del('/api/a05/documents/' + id); }

// ── A06 총기관리일지 /api/a06/gunjournal ─────────────────────────────────────
// 필드: date, userName, affiliation, gunType, gunName, gunNumber, barcode,
//       activity, result, inspector, memo
async function A06_addJournalEntry(d)        { return _post('/api/a06/gunjournal', d); }
async function A06_getJournalEntries(f)      { return _get('/api/a06/gunjournal', f); }
async function A06_updateJournalEntry(id, d) { return _put('/api/a06/gunjournal/' + id, d); }
async function A06_deleteJournalEntry(id)    { return _del('/api/a06/gunjournal/' + id); }

// ── B01 선수관리(대회용) /api/b01/players ─────────────────────────────────────
// 필드: userName, userBirth(YYMMDD), affiliation, gunType, gunName, gunNumber,
//       gunCaliber, ammoQty, barcode, contact, contestTitle, memo
async function B01_registerPlayer(d)   { return _post('/api/b01/players', d); }
async function B01_getPlayers(f)       { return _get('/api/b01/players', f); }
async function B01_updatePlayer(id, d) { return _put('/api/b01/players/' + id, d); }
async function B01_deletePlayer(id)    { return _del('/api/b01/players/' + id); }

// ── B02 총기관리(대회용) /api/b02/gunlogs ─────────────────────────────────────
// 필드: barcode, userName, gunType, gunNumber, gunName, checkOut, checkIn,
//       contestTitle, memo
async function B02_addGunLog(d)        { return _post('/api/b02/gunlogs', d); }
async function B02_getGunLogs(f)       { return _get('/api/b02/gunlogs', f); }
async function B02_updateGunLog(id, d) { return _put('/api/b02/gunlogs/' + id, d); }
async function B02_deleteGunLog(id)    { return _del('/api/b02/gunlogs/' + id); }

// ── B03 탄약관리(대회용) /api/b03/ammo ───────────────────────────────────────
// 필드: barcode, userName, gunType, ammoType, quantity,
//       transactionType('지급'|'반납'|'사용'), date, contestTitle, memo
async function B03_addAmmoRecord(d)        { return _post('/api/b03/ammo', d); }
async function B03_getAmmoRecords(f)       { return _get('/api/b03/ammo', f); }
async function B03_updateAmmoRecord(id, d) { return _put('/api/b03/ammo/' + id, d); }
async function B03_deleteAmmoRecord(id)    { return _del('/api/b03/ammo/' + id); }

// ── B04 문서관리대장(대회용) /api/b04/documents ───────────────────────────────
// 필드: docNumber, docTitle, docType, issuedDate, expiryDate, issuer,
//       holder, contestTitle, status, memo
async function B04_addDocument(d)        { return _post('/api/b04/documents', d); }
async function B04_getDocuments(f)       { return _get('/api/b04/documents', f); }
async function B04_updateDocument(id, d) { return _put('/api/b04/documents/' + id, d); }
async function B04_deleteDocument(id)    { return _del('/api/b04/documents/' + id); }

// ── B05 실탄출고확인서 /api/b05/releases ──────────────────────────────────────
// 필드: barcode, userName, affiliation, gunType, gunName, gunNumber,
//       ammoType, ammoQty, releaseDate, confirmedBy, contestTitle, memo
async function B05_addRelease(d)        { return _post('/api/b05/releases', d); }
async function B05_getReleases(f)       { return _get('/api/b05/releases', f); }
async function B05_updateRelease(id, d) { return _put('/api/b05/releases/' + id, d); }
async function B05_deleteRelease(id)    { return _del('/api/b05/releases/' + id); }
