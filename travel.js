document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider")
  const dotsContainer = document.getElementById("slider-dots")

  // 태그 페이징 처리
  const tagsContainer = document.querySelector(".tags")
  const paginationText = document.querySelector(".pagination-text")
  const paginationArrows = document.querySelectorAll(".pagination-arrow")

  const TAGS_PER_PAGE = 8
  let currentTagPage = 0

  function renderTags() {
    tagsContainer.innerHTML = ""
    const start = currentTagPage * TAGS_PER_PAGE
    const end = start + TAGS_PER_PAGE
    const pageTags = travelTags.slice(start, end)

    pageTags.forEach((tag) => {
      const tagDiv = document.createElement("div")
      tagDiv.className = "tag"
      tagDiv.textContent = "#" + tag
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

  // 검색 기능 구현
  const searchIcon = document.querySelector(".search-icon")
  const searchInput = document.querySelector(".search-input")
  const productListContainer = document.getElementById("product-list")

  searchIcon.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase()

    if (keyword) {
      // 키워드로 상품 필터링
      const filteredProducts = travelProductData.filter((product) => product.name.toLowerCase().includes(keyword))

      // 검색 결과 표시
      displaySearchResults(filteredProducts, keyword)
    }
  })

  // 엔터 키로도 검색 가능하게 설정
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const keyword = searchInput.value.trim().toLowerCase()

      if (keyword) {
        const filteredProducts = travelProductData.filter((product) => product.name.toLowerCase().includes(keyword))

        displaySearchResults(filteredProducts, keyword)
      }
    }
  })

  // 검색 결과 표시 함수
  function displaySearchResults(products, keyword) {
    // 기존 내용 초기화
    productListContainer.innerHTML = ""

    // 제목 추가
    const title = document.createElement("h2")
    title.className = "product-list-title"

    if (products.length > 0) {
      title.textContent = `"${keyword}" 검색 결과 (${products.length}건)`
    } else {
      title.textContent = `"${keyword}"에 대한 검색 결과가 없습니다.`
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