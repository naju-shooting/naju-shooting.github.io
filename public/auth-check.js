/**
 * auth-check.js
 * 비로그인 사용자의 하위 페이지 직접 접근(우회)을 차단하는 공통 보안 스크립트
 */
(function () {
    const authKey = 'isLoggedIn';
    let isAuth = false;
    try {
        if (sessionStorage.getItem(authKey) === 'true' || localStorage.getItem(authKey) === 'true') {
            isAuth = true;
        }
    } catch (e) {
        isAuth = false;
    }

    const redirectPaths = [
        '/AAABBB.html', '/AAA', '/A01', '/A02', '/A03', '/A04', '/A05', '/A06',
        '/BBB', '/B01', '/B02', '/B03', '/B04', '/B05'
    ];
    const currentPath = window.location.pathname;

    // If not authenticated and trying to access a protected legacy page, redirect to home.
    if (!isAuth && redirectPaths.includes(currentPath)) {
        window.location.replace('https://naju-shooting-github-io-6.onrender.com');
        return;
    }

    // If not authenticated (any other page), redirect to login root.
    if (!isAuth) {
        alert('보안 인증이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.replace('/');
        return;
    }
    // Authenticated: allow access to all pages.
})();