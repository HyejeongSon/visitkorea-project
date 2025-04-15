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
  let currentStartDate = new Date()
  let currentPage = 0
  let totalPages = 0
  let filteredFestivals = []

  updateVisibleDates(0)
  renderDates()
  updateMonthDisplay()
  filterAndRenderFestivals()
  updatePagination()

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
    if (currentPage > 0) {
      currentPage--
      renderFestivalPage()
      updatePagination()
    }
  })

  festivalNextBtn.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++
      renderFestivalPage()
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

    totalPages = Math.max(1, Math.ceil(filteredFestivals.length / 3))
    currentPage = 0

    renderFestivalPage()
  }

  function renderFestivalPage() {
    festivalSlider.innerHTML = ""

    if (filteredFestivals.length === 0) {
      const emptyMessage = document.createElement("div")
      emptyMessage.className = "empty-message"
      emptyMessage.textContent = "해당 날짜에 진행 중인 축제가 없습니다."
      festivalSlider.appendChild(emptyMessage)
      return
    }

    const startIdx = currentPage * 3
    const endIdx = Math.min(startIdx + 3, filteredFestivals.length)
    const pageFestivals = filteredFestivals.slice(startIdx, endIdx)

    pageFestivals.forEach((festival) => {
      const card = document.createElement("div")
      card.className = "festival-card"
      const imageUrl = festival.image || "/placeholder.svg?height=200&width=300"

      card.innerHTML = `
        <div class="festival-image" style="background-image: url('${imageUrl}')"></div>
        <div class="festival-content">
          <h3 class="festival-title">${festival.title}</h3>
          <div class="festival-location">${festival.district}</div>
          <div class="festival-info">
            <div class="festival-period">기간<br>${formatDateRange(festival.startDate, festival.endDate)}</div>
            <div class="festival-address">장소<br>${shortenLocation(festival.location)}</div>
          </div>
          <div class="festival-buttons">
            <a href="${festival.homepage}" target="_blank" class="festival-button">바로가기</a>
            <a href="https://map.naver.com/v5/search/${encodeURIComponent(festival.location)}" 
                target="_blank" class="festival-button">길찾기</a>
          </div>
        </div>
      `
      festivalSlider.appendChild(card)
    })
  }

  function updatePagination() {
    paginationDots.innerHTML = ""

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div")
      dot.className = "pagination-dot"
      if (i === currentPage) dot.classList.add("active")

      dot.addEventListener("click", () => {
        currentPage = i
        renderFestivalPage()
        updatePagination()
      })

      paginationDots.appendChild(dot)
    }
  }

  function formatDateRange(startStr, endStr) {
    const start = new Date(startStr)
    const end = new Date(endStr)
    return `${start.getMonth() + 1}.${start.getDate()}. ~ ${end.getMonth() + 1}.${end.getDate()}.`
  }

  function shortenLocation(location) {
    return location.length > 20 ? location.substring(0, 20) + "..." : location
  }

  function getWeekdayName(day) {
    return ["일", "월", "화", "수", "목", "금", "토"][day]
  }

  function isSameDate(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }
})
