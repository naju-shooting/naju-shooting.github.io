/**
 * auth-check.js
 * 비로그인 사용자의 하위 페이지 직접 접근(우회)을 차단하는 공통 보안 스크립트
 */
(function() {
    var authKey = 'isLoggedIn';
    var isAuth = false;

    try {
        if (sessionStorage.getItem(authKey) === 'true' || localStorage.getItem(authKey) === 'true') {
            isAuth = true;
        }
    } catch (e) {
        isAuth = false;
    }

    if (!isAuth) {
        alert('보안 인증이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.replace('/');
    }
})();
