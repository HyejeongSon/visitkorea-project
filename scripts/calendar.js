document.addEventListener("DOMContentLoaded", () => {
    const dateSlider = document.getElementById("date-slider")
    const currentMonthDisplay = document.getElementById("current-month")
    const datePrevBtn = document.getElementById("date-prev")
    const dateNextBtn = document.getElementById("date-next")
  
    let visibleDates = []
    let selectedDate = new Date()
    const currentStartDate = new Date()
  
    updateVisibleDates(0)
    renderDates()
    updateMonthDisplay()
  
    datePrevBtn.addEventListener("click", () => {
      updateVisibleDates(-14)
      renderDates()
      updateMonthDisplay()
      window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }))
    })
  
    dateNextBtn.addEventListener("click", () => {
      updateVisibleDates(14)
      renderDates()
      updateMonthDisplay()
      window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }))
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
  
    // Update the renderDates function to show year.month above dates
    function renderDates() {
      dateSlider.innerHTML = ""
  
      // Group dates by month for displaying month headers
      const monthGroups = {}
      visibleDates.forEach((date) => {
        const monthKey = `${date.getFullYear()}.${date.getMonth() + 1}`
        if (!monthGroups[monthKey]) {
          monthGroups[monthKey] = []
        }
        monthGroups[monthKey].push(date)
      })
  
      // Render dates with month indicators
      visibleDates.forEach((date, index) => {
        const dateItem = document.createElement("div")
        dateItem.className = "date-item"
        const day = date.getDay()
        if (day === 0) dateItem.classList.add("weekday-sun")
        if (day === 6) dateItem.classList.add("weekday-sat")
  
        const dateNum = date.getDate()
        const weekdayName = getWeekdayName(day)
        const monthKey = `${date.getFullYear()}.${date.getMonth() + 1}`
  
        // Add month indicator if it's the first date or the first day of a month
        if (index === 0 || dateNum === 1) {
          dateItem.innerHTML = `
              <div class="date-month">${date.getFullYear()}.${date.getMonth() + 1}</div>
              <div class="date-day ${isSameDate(date, selectedDate) ? "selected" : ""}">${dateNum}</div>
              <div class="date-weekday">${weekdayName}</div>
            `
        } else {
          dateItem.innerHTML = `
              <div class="date-day ${isSameDate(date, selectedDate) ? "selected" : ""}">${dateNum}</div>
              <div class="date-weekday">${weekdayName}</div>
            `
        }
  
        dateItem.addEventListener("click", () => {
          selectedDate = date
          renderDates()
          window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }))
        })
  
        dateSlider.appendChild(dateItem)
      })
    }
  
    // Remove the updateMonthDisplay function as we're showing months above dates
    function updateMonthDisplay() {
      // This function is no longer needed as we show month indicators above dates
      // But we'll keep it empty to avoid breaking existing code
    }
  
    function getWeekdayName(day) {
      return ["일", "월", "화", "수", "목", "금", "토"][day]
    }
  
    function isSameDate(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
    }
  
    window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }))
  })
  