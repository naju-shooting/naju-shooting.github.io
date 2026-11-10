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

    // List of legacy paths to block when not authenticated
    var redirectPaths = [
        '/AAABBB.html', '/AAA', '/A01', '/A02', '/A03', '/A04', '/A05', '/A06',
        '/BBB', '/B01', '/B02', '/B03', '/B04', '/B05'
    ];
    var currentPath = window.location.pathname;

    // If user is not authenticated and trying to access a legacy page, send to home
    if (!isAuth && redirectPaths.includes(currentPath)) {
        window.location.replace('https://naju-shooting-github-io-6.onrender.com');
        return;
    }

    // If not authenticated (any other page), redirect to login root
    if (!isAuth) {
        alert('보안 인증이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.replace('/');
        return;
    }
})();
    // List of paths to force redirect to main page if accessed directly without login
    var redirectPaths = [
        '/AAABBB.html', '/AAA', '/A01', '/A02', '/A03', '/A04', '/A05', '/A06',
        '/BBB', '/B01', '/B02', '/B03', '/B04', '/B05'
    ];
    var currentPath = window.location.pathname;
    // If the user is not authenticated, block access to legacy pages.
    if (!isAuth && redirectPaths.includes(currentPath)) {
        window.location.replace('https://naju-shooting-github-io-6.onrender.com');
        return;
    }

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

