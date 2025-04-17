document.addEventListener("DOMContentLoaded", () => {
  const festivalSlider = document.getElementById("festival-slider");
  const festivalPrevBtn = document.getElementById("festival-prev");
  const festivalNextBtn = document.getElementById("festival-next");
  const paginationDots = document.getElementById("pagination-dots");

  let filteredFestivals = [];
  let currentFestivalIndex = 0;
  let slideWidth = 0;
  const slideGap = 30;

  window.addEventListener("resize", calculateSlideWidth);
  window.addEventListener("dateChanged", (e) => {
    filterAndRenderFestivals(e.detail);
  });

  function filterAndRenderFestivals(selectedDate) {
    filteredFestivals = festivals.filter((festival) => {
      const startDate = new Date(festival.startDate);
      const endDate = new Date(festival.endDate);
      return selectedDate >= startDate && selectedDate <= endDate;
    });

    currentFestivalIndex = 0;
    renderFestivalSlider();
    calculateSlideWidth();
    updateSliderPosition();
    updatePagination();
  }

  function renderFestivalSlider() {
    festivalSlider.innerHTML = "";
    if (filteredFestivals.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "empty-message";
      emptyMessage.textContent = "해당 날짜에 진행 중인 축제가 없습니다.";
      festivalSlider.appendChild(emptyMessage);
      return;
    }

    const dummySlide = document.createElement("div");
    dummySlide.className = "swiper-slide dummy-slide";
    dummySlide.style.visibility = "hidden";
    festivalSlider.appendChild(dummySlide);

    filteredFestivals.forEach((festival, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.setAttribute("data-index", index);

      const imageUrl = festival.image || "/placeholder.svg?height=200&width=300";

      slide.innerHTML = `
        <div class="inr">
          <span class="img">
            <img src="${imageUrl}" alt="${festival.title}">
          </span>
          <div class="info">
            <h3>${festival.title}</h3>
            <em>${festival.district}</em>
            <div class="period_place">
              <div class="period">
                <strong>기간</strong>
                <span>${formatDateRange(festival.startDate, festival.endDate)}</span>
              </div>
              <div class="place">
                <strong>장소</strong>
                <span>${shortenLocation(festival.location)}</span>
              </div>
            </div>
            <div class="festival-btn">
              <a href="${festival.homepage}" target="_blank">바로가기</a>
              <a href="https://map.naver.com/v5/search/${encodeURIComponent(festival.location)}" target="_blank">길찾기</a>
            </div>
          </div>
        </div>
      `;

      festivalSlider.appendChild(slide);
    });

    updateActiveStates();
  }

  function calculateSlideWidth() {
    if (filteredFestivals.length === 0) return;
    const slide = document.querySelector(".swiper-slide:not(.dummy-slide)");
    if (slide) {
      slideWidth = slide.offsetWidth + slideGap;
    }
  }

  function updateSliderPosition() {
    if (filteredFestivals.length === 0) return;

    const containerWidth = festivalSlider.parentElement.offsetWidth;
    const offset = Math.max(0, (currentFestivalIndex + 1) * slideWidth - containerWidth / 2 + slideWidth / 2);
    festivalSlider.style.transform = `translateX(-${offset}px)`;
  }

  function updateActiveStates() {
    const slides = document.querySelectorAll(".swiper-slide");
    slides.forEach((slide, index) => {
      slide.classList.toggle("inactive", index !== currentFestivalIndex + 1);
    });
  }

  function updatePagination() {
    paginationDots.innerHTML = "";
    for (let i = 0; i < filteredFestivals.length; i++) {
      const dot = document.createElement("div");
      dot.className = "pagination-dot";
      if (i === currentFestivalIndex) dot.classList.add("active");

      dot.addEventListener("click", () => {
        currentFestivalIndex = i;
        updateSliderPosition();
        updateActiveStates();
        updatePagination();
      });

      paginationDots.appendChild(dot);
    }
  }

  function formatDateRange(startStr, endStr) {
    const start = new Date(startStr);
    const end = new Date(endStr);
    return `${start.getFullYear()}. ${start.getMonth() + 1}. ${start.getDate()}. ~<br/> ${end.getFullYear()}. ${end.getMonth() + 1}. ${end.getDate()}.`;
  }

  function shortenLocation(location) {
    return location.length > 25 ? location.substring(0, 25) + "..." : location;
  }

  // 버튼 이벤트
  festivalPrevBtn.addEventListener("click", () => {
    if (currentFestivalIndex > 0) {
      currentFestivalIndex--;
      updateSliderPosition();
      updateActiveStates();
      updatePagination();
    }
  });

  festivalNextBtn.addEventListener("click", () => {
    if (currentFestivalIndex < filteredFestivals.length - 1) {
      currentFestivalIndex++;
      updateSliderPosition();
      updateActiveStates();
      updatePagination();
    }
  });

  window.addEventListener("dateChanged", (e) => {
    const selectedDate = e.detail;
    filterAndRenderFestivals(selectedDate);
  });
});