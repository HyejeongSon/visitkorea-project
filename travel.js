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
  })
  