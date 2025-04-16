document.addEventListener("DOMContentLoaded", () => {
  const dateSlider = document.getElementById("date-slider")
  const festivalSlider = document.getElementById("festival-slider")
  const currentMonthDisplay = document.getElementById("current-month")
  const paginationDots = document.getElementById("pagination-dots")
  const datePrevBtn = document.getElementById("date-prev")
  const dateNextBtn = document.getElementById("date-next")
  const festivalPrevBtn = document.getElementById("festival-prev")
  const festivalNextBtn = document.getElementById("festival-next")

  let visibleDates = []
  let selectedDate = new Date()
  const currentStartDate = new Date()
  let currentFestivalIndex = 0
  let filteredFestivals = []
  let slideWidth = 0
  const slideGap = 30

  updateVisibleDates(0)
  renderDates()
  updateMonthDisplay()
  filterAndRenderFestivals()
  updatePagination()

  window.addEventListener("resize", calculateSlideWidth)

  datePrevBtn.addEventListener("click", () => {
    updateVisibleDates(-14)
    renderDates()
    updateMonthDisplay()
  })

  dateNextBtn.addEventListener("click", () => {
    updateVisibleDates(14)
    renderDates()
    updateMonthDisplay()
  })

  festivalPrevBtn.addEventListener("click", () => {
    if (currentFestivalIndex > 0) {
      currentFestivalIndex--
      updateSliderPosition()
      updateActiveStates()
      updatePagination()
    }
  })

  festivalNextBtn.addEventListener("click", () => {
    if (currentFestivalIndex < filteredFestivals.length - 1) {
      currentFestivalIndex++
      updateSliderPosition()
      updateActiveStates()
      updatePagination()
    }
  })

  function updateVisibleDates(offset = 0) {
    currentStartDate.setDate(currentStartDate.getDate() + offset)
    visibleDates = []
    for (let i = 0; i < 14; i++) {
      const date = new Date(currentStartDate)
      date.setDate(currentStartDate.getDate() + i)
      visibleDates.push(date)
    }
  }

  function renderDates() {
    dateSlider.innerHTML = ""
    visibleDates.forEach((date) => {
      const dateItem = document.createElement("div")
      dateItem.className = "date-item"

      const day = date.getDay()
      if (day === 0) dateItem.classList.add("weekday-sun")
      if (day === 6) dateItem.classList.add("weekday-sat")

      const dateNum = date.getDate()
      const weekdayName = getWeekdayName(day)

      dateItem.innerHTML = `
        <div class="date-day ${isSameDate(date, selectedDate) ? "selected" : ""}">${dateNum}</div>
        <div class="date-weekday">${weekdayName}</div>
      `

      dateItem.addEventListener("click", () => {
        selectedDate = date
        renderDates()
        filterAndRenderFestivals()
        updatePagination()
      })

      dateSlider.appendChild(dateItem)
    })
  }

  function updateMonthDisplay() {
    const firstDate = visibleDates[0]
    const year = firstDate.getFullYear()
    const month = firstDate.getMonth() + 1
    currentMonthDisplay.textContent = `${year}.${month}`
  }

  function filterAndRenderFestivals() {
    filteredFestivals = festivals.filter((festival) => {
      const startDate = new Date(festival.startDate)
      const endDate = new Date(festival.endDate)
      return selectedDate >= startDate && selectedDate <= endDate
    })

    currentFestivalIndex = 0
    renderFestivalSlider()
    calculateSlideWidth()
    updateSliderPosition()
  }

  function renderFestivalSlider() {
    festivalSlider.innerHTML = ""

    if (filteredFestivals.length === 0) {
      const emptyMessage = document.createElement("div")
      emptyMessage.className = "empty-message"
      emptyMessage.textContent = "해당 날짜에 진행 중인 축제가 없습니다."
      festivalSlider.appendChild(emptyMessage)
      return
    }

    filteredFestivals.forEach((festival, index) => {
      const slide = document.createElement("div")
      slide.className = "swiper-slide"
      slide.setAttribute("data-index", index)

      const imageUrl = festival.image || "/placeholder.svg?height=200&width=300"

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
            <div class="btn">
              <a href="${festival.homepage}" target="_blank">바로가기</a>
              <a href="https://map.naver.com/v5/search/${encodeURIComponent(festival.location)}" target="_blank">길찾기</a>
            </div>
          </div>
        </div>
      `

      festivalSlider.appendChild(slide)
    })

    updateActiveStates()
  }

  function calculateSlideWidth() {
    if (filteredFestivals.length === 0) return
    const slide = document.querySelector(".swiper-slide")
    if (slide) {
      slideWidth = slide.offsetWidth + slideGap
    }
  }

  function updateSliderPosition() {
    if (filteredFestivals.length === 0) return

    const containerWidth = festivalSlider.parentElement.offsetWidth
    const slideCenter = slideWidth / 2
    const containerCenter = containerWidth / 2

    let offset = currentFestivalIndex * slideWidth - containerCenter + slideCenter
    offset = Math.max(0, offset)

    festivalSlider.style.transform = `translateX(-${offset}px)`
    updateActiveStates()
  }

  function updateActiveStates() {
    const slides = document.querySelectorAll(".swiper-slide")
    slides.forEach((slide, index) => {
      if (index === currentFestivalIndex) {
        slide.classList.remove("inactive")
      } else {
        slide.classList.add("inactive")
      }
    })
  }

  function updatePagination() {
    paginationDots.innerHTML = ""
    for (let i = 0; i < filteredFestivals.length; i++) {
      const dot = document.createElement("div")
      dot.className = "pagination-dot"
      if (i === currentFestivalIndex) dot.classList.add("active")

      dot.addEventListener("click", () => {
        currentFestivalIndex = i
        updateSliderPosition()
        updateActiveStates()
        updatePagination()
      })

      paginationDots.appendChild(dot)
    }
  }

  function formatDateRange(startStr, endStr) {
    const start = new Date(startStr)
    const end = new Date(endStr)
    return `${start.getFullYear()}. ${start.getMonth() + 1}. ${start.getDate()}. ~<br/> ${end.getFullYear()}. ${end.getMonth() + 1}. ${end.getDate()}.`
  }

  function shortenLocation(location) {
    return location.length > 25 ? location.substring(0, 25) + "..." : location
  }

  function getWeekdayName(day) {
    return ["일", "월", "화", "수", "목", "금", "토"][day]
  }

  function isSameDate(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
  }
})