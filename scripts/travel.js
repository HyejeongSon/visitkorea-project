document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider")
  const dotsContainer = document.getElementById("slider-dots")

  // 태그 페이징 처리
  const tagsContainer = document.querySelector(".tags")
  const paginationText = document.querySelector(".pagination-text")
  const paginationArrows = document.querySelectorAll(".pagination-arrow")

  const TAGS_PER_PAGE = 8
  let currentTagPage = 0

  // 필터링을 위한 선택된 값들
  let selectedRegions = []
  let selectedMonths = []
  let selectedTags = []

  function renderTags() {
    tagsContainer.innerHTML = ""
    const start = currentTagPage * TAGS_PER_PAGE
    const end = start + TAGS_PER_PAGE
    const pageTags = travelTags.slice(start, end)

    pageTags.forEach((tag) => {
      const tagDiv = document.createElement("div")
      tagDiv.className = "tag"
      tagDiv.textContent = "#" + tag
      // 선택된 태그에 대한 스타일 적용
      if (selectedTags.includes(tag)) {
        tagDiv.classList.add("selected")
      }
      tagDiv.addEventListener("click", () => {
        // 태그 선택/해제 토글
        if (selectedTags.includes(tag)) {
          selectedTags = selectedTags.filter((t) => t !== tag)
          tagDiv.classList.remove("selected")
        } else {
          selectedTags.push(tag)
          tagDiv.classList.add("selected")
        }
        updateSelectedFiltersDisplay()
      })
      tagsContainer.appendChild(tagDiv)
    })

    const totalPages = Math.ceil(travelTags.length / TAGS_PER_PAGE)
    paginationText.textContent = `${currentTagPage + 1} / ${totalPages}`
  }

  paginationArrows[0].addEventListener("click", () => {
    if (currentTagPage > 0) {
      currentTagPage--
      renderTags()
    }
  })

  paginationArrows[1].addEventListener("click", () => {
    const totalPages = Math.ceil(travelTags.length / TAGS_PER_PAGE)
    if (currentTagPage < totalPages - 1) {
      currentTagPage++
      renderTags()
    }
  })

  renderTags() // 초기 렌더링

  // 슬라이드와 도트 동적 생성
  travelData.forEach((item, index) => {
    // slide element
    const slide = document.createElement("div")
    slide.className = "slide"
    if (index === 0) slide.classList.add("active")

    slide.innerHTML = `
          <img src="${item.img}" class="slide-image" alt="${item.alt}">
          <div class="slide-content">
            <h2 class="slide-title">${item.title}</h2>
            <button class="slide-button">자세히보기</button>
          </div>
        `
    slider.appendChild(slide)

    // dot element
    const dot = document.createElement("div")
    dot.className = "slider-dot"
    if (index === 0) dot.classList.add("active")
    dot.dataset.index = index
    dotsContainer.appendChild(dot)
  })

  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".slider-dot")
  const prevButton = document.getElementById("prev-button")
  const nextButton = document.getElementById("next-button")
  const pauseButton = document.getElementById("pause-button")

  let currentSlide = 0
  let slideInterval
  let isPaused = false

  function startSlider() {
    slideInterval = setInterval(nextSlide, 4000)
  }

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    slides[index].classList.add("active")
    dots[index].classList.add("active")
    currentSlide = index
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
  }

  prevButton.addEventListener("click", () => {
    prevSlide()
    if (!isPaused) {
      clearInterval(slideInterval)
      startSlider()
    }
  })

  nextButton.addEventListener("click", () => {
    nextSlide()
    if (!isPaused) {
      clearInterval(slideInterval)
      startSlider()
    }
  })

  pauseButton.addEventListener("click", () => {
    if (isPaused) {
      startSlider()
      pauseButton.textContent = "❚❚"
    } else {
      clearInterval(slideInterval)
      pauseButton.textContent = "▶"
    }
    isPaused = !isPaused
  })

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("slider-dot")) {
      const index = Number.parseInt(e.target.dataset.index, 10)
      showSlide(index)
      if (!isPaused) {
        clearInterval(slideInterval)
        startSlider()
      }
    }
  })

  startSlider()

  // 지역 선택 모달 관련 코드
  const locationInput = document.querySelector(".location-input")
  const locationIcon = document.querySelector(".location-icon")

  // 날짜 선택 모달 관련 코드
  const dateInput = document.querySelector(".date-input")
  const dateIcon = document.querySelector(".date-icon")

  // 모달 생성 및 추가
  const body = document.body

  // 지역 선택 모달
  const regions = [
    "서울", "인천", "대전", "대구", "광주", "부산", "울산",
    "경기", "강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주"
  ];

  const regionItems = regions
    .map(region => `<div class="modal-item" data-region="${region}">${region}</div>`)
    .join("");

  const locationModalHTML = `
    <div class="modal-overlay" id="location-modal-overlay">
      <div class="modal">
        <button class="modal-close">&times;</button>
        <h3 class="modal-title">어디로 여행가세요?</h3>
        <p class="modal-subtitle">다중 선택 가능합니다.</p>
        <div class="modal-grid" id="region-grid">
          ${regionItems}
        </div>
        <button class="modal-confirm">확인</button>
      </div>
    </div>
  `;

  // 월 선택 모달
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1~12]

  const monthItems = months
    .map(month => `<div class="modal-item" data-month="${month}">${month}월</div>`)
    .join("");

  const monthModalHTML = `
    <div class="modal-overlay" id="month-modal-overlay">
      <div class="modal">
        <button class="modal-close">&times;</button>
        <h3 class="modal-title">언제 여행을 떠나시나요?</h3>
        <p class="modal-subtitle">다중 선택 가능합니다.</p>
        <div class="modal-grid" id="month-grid">
          ${monthItems}
        </div>
        <button class="modal-confirm">확인</button>
      </div>
    </div>
  `;

  // 모달 HTML 추가
  const modalContainer = document.createElement("div")
  modalContainer.innerHTML = locationModalHTML + monthModalHTML
  body.appendChild(modalContainer)

  // 선택된 필터 표시 영역 추가
  const filterSection = document.createElement("div")
  filterSection.className = "filter-section"
  filterSection.innerHTML = `
    <div class="filter-title">선택된 필터</div>
    <div class="selected-filters" id="selected-filters"></div>
  `

  // 검색 섹션 아래에 필터 섹션 추가
  const searchSection = document.querySelector(".search-section")
  searchSection.appendChild(filterSection)

  // 모달 요소 가져오기
  const locationModalOverlay = document.getElementById("location-modal-overlay")
  const monthModalOverlay = document.getElementById("month-modal-overlay")
  const regionGrid = document.getElementById("region-grid")
  const monthGrid = document.getElementById("month-grid")
  const selectedFiltersContainer = document.getElementById("selected-filters")

  // 모달 열기 이벤트
  locationInput.addEventListener("click", () => {
    locationModalOverlay.style.display = "flex"
  })

  locationIcon.addEventListener("click", () => {
    locationModalOverlay.style.display = "flex"
  })

  dateInput.addEventListener("click", () => {
    monthModalOverlay.style.display = "flex"
  })

  dateIcon.addEventListener("click", () => {
    monthModalOverlay.style.display = "flex"
  })

  // 모달 닫기 이벤트
  document.querySelectorAll(".modal-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      locationModalOverlay.style.display = "none"
      monthModalOverlay.style.display = "none"
    })
  })

  // 모달 외부 클릭 시 닫기
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none"
      }
    })
  })

  // 지역 선택 이벤트
  regionGrid.querySelectorAll(".modal-item").forEach((item) => {
    item.addEventListener("click", () => {
      const region = item.dataset.region

      if (selectedRegions.includes(region)) {
        // 이미 선택된 경우 제거
        selectedRegions = selectedRegions.filter((r) => r !== region)
        item.classList.remove("selected")
      } else {
        // 선택되지 않은 경우 추가
        selectedRegions.push(region)
        item.classList.add("selected")
      }
    })
  })

  // 월 선택 이벤트
  monthGrid.querySelectorAll(".modal-item").forEach((item) => {
    item.addEventListener("click", () => {
      const month = item.dataset.month

      if (selectedMonths.includes(month)) {
        // 이미 선택된 경우 제거
        selectedMonths = selectedMonths.filter((m) => m !== month)
        item.classList.remove("selected")
      } else {
        // 선택되지 않은 경우 추가
        selectedMonths.push(month)
        item.classList.add("selected")
      }
    })
  })

  // 확인 버튼 이벤트
  document.querySelectorAll(".modal-confirm").forEach((btn) => {
    btn.addEventListener("click", () => {
      // 모달 닫기
      locationModalOverlay.style.display = "none"
      monthModalOverlay.style.display = "none"

      // 선택된 필터 표시 업데이트
      updateSelectedFiltersDisplay()

      // 입력 필드 업데이트
      updateInputFields()
    })
  })

  // 선택된 필터 표시 업데이트 함수
  function updateSelectedFiltersDisplay() {
    selectedFiltersContainer.innerHTML = ""

    // 선택된 지역 표시
    selectedRegions.forEach((region) => {
      addFilterTag(region, "region")
    })

    // 선택된 월 표시
    selectedMonths.forEach((month) => {
      addFilterTag(`${month}월`, "month")
    })

    // 선택된 필터가 없는 경우 메시지 표시
    if (selectedRegions.length === 0 && selectedMonths.length === 0 && selectedTags.length === 0) {
      selectedFiltersContainer.innerHTML = '<div class="no-filters">선택된 필터가 없습니다</div>'
    }
  }

  // 필터 태그 추가 함수
  function addFilterTag(text, type) {
    const tag = document.createElement("div")
    tag.className = "selected-filter"
    tag.innerHTML = `
      ${text} <span class="selected-filter-remove">×</span>
    `

    // 삭제 버튼 이벤트
    tag.querySelector(".selected-filter-remove").addEventListener("click", () => {
      if (type === "region") {
        selectedRegions = selectedRegions.filter((r) => r !== text)
        // 모달 내 선택 상태 업데이트
        const regionItem = regionGrid.querySelector(`[data-region="${text}"]`)
        if (regionItem) regionItem.classList.remove("selected")
      } else if (type === "month") {
        const monthNumber = text.replace("월", "")
        selectedMonths = selectedMonths.filter((m) => m !== monthNumber)
        // 모달 내 선택 상태 업데이트
        const monthItem = monthGrid.querySelector(`[data-month="${monthNumber}"]`)
        if (monthItem) monthItem.classList.remove("selected")
      } else if (type === "tag") {
        const tagText = text.replace("#", "")
        selectedTags = selectedTags.filter((t) => t !== tagText)
        // 태그 선택 상태 업데이트
        renderTags()
      }

      // 필터 표시 및 입력 필드 업데이트
      updateSelectedFiltersDisplay()
      updateInputFields()
    })

    selectedFiltersContainer.appendChild(tag)
  }

  // 입력 필드 업데이트 함수
  function updateInputFields() {
    if (selectedRegions.length > 0) {
      locationInput.value = selectedRegions.join(", ")
    } else {
      locationInput.value = ""
      locationInput.placeholder = "어디로 여행가세요?"
    }

    if (selectedMonths.length > 0) {
      dateInput.value = selectedMonths.map((m) => `${m}월`).join(", ")
    } else {
      dateInput.value = ""
      dateInput.placeholder = "여행 일정도 추가 할래요!"
    }
  }

  // 검색 기능 구현
  const searchIcon = document.querySelector(".search-icon")
  const searchInput = document.querySelector(".search-input")
  const productListContainer = document.getElementById("product-list")
  const searchButton = document.querySelector(".search-button")

  searchIcon.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase()
    performSearch(keyword)
  })

  // 엔터 키로도 검색 가능하게 설정
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const keyword = searchInput.value.trim().toLowerCase()
      performSearch(keyword)
    }
  })

  // 검색 버튼 클릭 시 필터링 적용
  searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase()
    performSearch(keyword)
  })

  // 검색 및 필터링 수행 함수
  function performSearch(keyword) {
    // 필터링 조건 적용
    const filteredProducts = travelProductData.filter((product) => {
      // 키워드 필터링 (키워드가 있는 경우에만)
      const keywordMatch = !keyword || product.name.toLowerCase().includes(keyword)

      // 지역 필터링 (선택된 지역이 있는 경우에만)
      const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(product.region)

      // 월 필터링 (선택된 월이 있는 경우에만)
      let monthMatch = true
      if (selectedMonths.length > 0) {
        const startDate = new Date(product.startDate)
        const endDate = new Date(product.endDate)

        // 현재 연도 기준으로만 필터링
        const currentYear = new Date().getFullYear()

        monthMatch = selectedMonths.some((month) => {
          const monthNum = Number.parseInt(month)
          // 현재 연도의 해당 월 중간 날짜
          const checkDate = new Date(currentYear, monthNum - 1, 15)

          return checkDate >= startDate && checkDate <= endDate
        })
      }

      // 태그 필터링 (선택된 태그가 있는 경우에만)
      const tagMatch = selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag))

      // 모든 조건을 만족하는 경우만 반환
      return keywordMatch && regionMatch && monthMatch && tagMatch
    })

    // 검색 결과 표시
    displaySearchResults(filteredProducts, keyword)
  }

  // 검색 결과 표시 함수
  function displaySearchResults(products, keyword) {
    // 기존 내용 초기화
    productListContainer.innerHTML = ""

    // 제목 추가
    const title = document.createElement("h2")
    title.className = "product-list-title"

    // 검색어와 필터 조건에 따른 제목 설정
    let titleText = ""

    if (keyword) {
      titleText += `"${keyword}" `
    }

    if (selectedRegions.length > 0 || selectedMonths.length > 0 || selectedTags.length > 0) {
      titleText += "필터링 "
    }

    if (titleText === "") {
      titleText = "검색 "
    }

    if (products.length > 0) {
      title.textContent = `${titleText}결과 (${products.length}건)`
    } else {
      title.textContent = `${titleText}결과가 없습니다.`
    }

    productListContainer.appendChild(title)

    // 상품 그리드 생성
    const productGrid = document.createElement("div")
    productGrid.className = "product-grid"

    // 상품 카드 추가
    products.forEach((product) => {
      const card = createProductCard(product)
      productGrid.appendChild(card)
    })

    productListContainer.appendChild(productGrid)

    // 리스트 표시
    productListContainer.style.display = "block"

    // 스크롤 이동
    setTimeout(() => {
      productListContainer.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  // 상품 카드 생성 함수
  function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "product-card"

    const formattedPrice = product.minPrice.toLocaleString() + "원~"

    const startDate = new Date(product.startDate)
    const endDate = new Date(product.endDate)
    const formattedStartDate = `${startDate.getFullYear()}.${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${startDate.getDate().toString().padStart(2, "0")}`
    const formattedEndDate = `${endDate.getFullYear()}.${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${endDate.getDate().toString().padStart(2, "0")}`
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`

    const imageUrl = product.img || "https://via.placeholder.com/300x200?text=No+Image"

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${imageUrl}" alt="${product.name}" class="product-image">
        <div class="product-region">${product.region}</div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formattedPrice}</div>
        <div class="product-date">${dateRange}</div>
        <div class="product-tags">
          ${product.tags.map((tag) => `<span class="product-tag">#${tag}</span>`).join("")}
        </div>
      </div>
    `
    return card
  }
})