function initializeFooterIcons() {
    const icons = [
        { id: 'icon1', graySrc: './icons/blog_gray.png', colorSrc: './icons/blog_color.png' },
        { id: 'icon2', graySrc: './icons/post_gray.png', colorSrc: './icons/post_color.png' },
        { id: 'icon3', graySrc: './icons/facebook_gray.png', colorSrc: './icons/facebook_color.png' },
        { id: 'icon4', graySrc: './icons/x_gray.png', colorSrc: './icons/x_color.png' },
        { id: 'icon5', graySrc: './icons/kakaostory_gray.png', colorSrc: './icons/kakaostory_color.png' },
        { id: 'icon6', graySrc: './icons/insta_gray.png', colorSrc: './icons/insta_color.png' },
        { id: 'icon7', graySrc: './icons/band_gray.png', colorSrc: './icons/band_color.png' },
    ];

    icons.forEach(icon => {
        const element = document.getElementById(icon.id);
        if (element) {
            element.addEventListener('mouseover', () => {
                console.log("올라왔다이");
                element.src = icon.colorSrc; // 컬러 아이콘으로 변경
            });
            element.addEventListener('mouseout', () => {
                console.log("내려갔다이");
                element.src = icon.graySrc; // 회색 아이콘으로 복원
            });
        }
    });
}

// 다른 페이지에서 이 함수를 호출할 수 있도록 전역으로 노출
window.initializeFooterIcons = initializeFooterIcons;