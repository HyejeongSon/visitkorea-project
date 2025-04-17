
document.addEventListener('DOMContentLoaded', function() {
    // 슬라이더 요소
    const slider = document.getElementById('mainSlider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // 슬라이더 컨트롤 요소
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const progressBar = document.getElementById('progressBar');
    
    // 네비게이션 바
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');
    const megaDropdown = document.querySelector('.mega-dropdown');
    
    // 슬라이더 상태
    let currentIndex = 0;
    let isPlaying = true;
    let slideInterval;
    let progressInterval;
    const slideDelay = 5000; // 5초마다 슬라이드 변경
    let progress = 0
    navbar.classList.add("top")
    // 총 슬라이드 수 표시
    totalSlidesEl.textContent = String(totalSlides).padStart(2, '0');
    
    // 슬라이드 이동 함수
    function goToSlide(index) {
        // 인덱스 범위 확인
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // 이전 활성 슬라이드에서 active 클래스 제거
        slides[currentIndex].classList.remove('active');
        
        // 새 인덱스 설정
        currentIndex = index;
        
        // 슬라이드 이동
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 현재 슬라이드 번호 업데이트
        currentSlideEl.textContent = String(currentIndex + 1).padStart(2, '0');
        
        // 네비게이션 바 배경색 변경
        updateNavbarTheme();
        
        // 프로그레스 바 리셋
        resetProgress();
        
        // 약간의 지연 후 새 슬라이드에 active 클래스 추가
        setTimeout(() => {
            slides[currentIndex].classList.add('active');
        }, 50);
    }
    
    // 네비게이션 바 테마 업데이트
    function updateNavbarTheme() {
        // 기존 테마 클래스 제거
        navbar.classList.remove('theme-lightblue', 'theme-orange', 'theme-blue', 'theme-purple', 'theme-green');
        
        // 현재 슬라이드의 테마 가져오기
        const currentTheme = slides[currentIndex].getAttribute('data-theme');
        
        // 새 테마 클래스 추가
        navbar.classList.add(`theme-${currentTheme}`);
    }
    
    
    // 프로그레스 바 업데이트
    function updateProgress() {
        progress += 100 / (slideDelay / 100); // 100ms마다 업데이트
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // 프로그레스 바 리셋
    function resetProgress() {
        progress = 0;
        progressBar.style.width = '0%';
    }
    
    // 자동 슬라이드 시작
    function startAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        resetProgress();
        
        // 프로그레스 바 업데이트 인터벌
        progressInterval = setInterval(updateProgress, 100);
        
        // 슬라이드 변경 인터벌
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, slideDelay);
    }
    
    // 자동 슬라이드 정지
    function stopAutoSlide() {
        clearInterval(slideInterval);
        clearInterval(progressInterval);
    }
    
    // 재생/정지 토글
    function togglePlayPause() {
        if (isPlaying) {
            stopAutoSlide();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
        } else {
            startAutoSlide();
            pauseIcon.style.display = 'block';
            playIcon.style.display = 'none';
        }
        
        isPlaying = !isPlaying;
    }
    
    // 스크롤 이벤트 처리
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('top');

        } else {
            navbar.classList.add('top');
    
            navbar.classList.remove('scrolled');

            updateNavbarTheme(); // 상단으로 돌아갔을 때 테마 색상 복원
        }
    });
    header.addEventListener('mouseover',function(){
        console.log("하이")
        navbar.classList.add('scrolled');
        
    })
    header.addEventListener('mouseout',function(){
        console.log("바이")
        if(navbar.classList.contains("top")){
            navbar.classList.remove('scrolled')
            updateNavbarTheme();
        }
    })
        
    // 이벤트 리스너
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        if (isPlaying) {
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        if (isPlaying) {
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // 키보드 이벤트
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === ' ') {
            togglePlayPause();
        }
    });
    
    // 터치 이벤트 처리
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // 오른쪽에서 왼쪽으로 스와이프 (다음 슬라이드)
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        }
        // 왼쪽에서 오른쪽으로 스와이프 (이전 슬라이드)
        else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    }
    
    // 초기화
    updateNavbarTheme();
    
    // 첫 번째 슬라이드 활성화
    slides[currentIndex].classList.add('active');
    
    startAutoSlide();
    
    // 페이지 가시성 변경 시 자동 슬라이드 제어
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (isPlaying) {
            startAutoSlide();
        }
    });

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
        element.addEventListener('mouseover', () => {
            element.src = icon.colorSrc; // 컬러 아이콘으로 변경
        });
        element.addEventListener('mouseout', () => {
            element.src = icon.graySrc; // 회색 아이콘으로 복원
        });
    });
});