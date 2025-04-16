document.addEventListener("DOMContentLoaded", () => {
  const dateSlider = document.getElementById("date-slider");
  const currentMonthDisplay = document.getElementById("current-month");
  const datePrevBtn = document.getElementById("date-prev");
  const dateNextBtn = document.getElementById("date-next");

  let visibleDates = [];
  let selectedDate = new Date();
  const currentStartDate = new Date();

  updateVisibleDates(0);
  renderDates();
  updateMonthDisplay();

  datePrevBtn.addEventListener("click", () => {
    updateVisibleDates(-14);
    renderDates();
    updateMonthDisplay();
    window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }));
  });

  dateNextBtn.addEventListener("click", () => {
    updateVisibleDates(14);
    renderDates();
    updateMonthDisplay();
    window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }));
  });

  function updateVisibleDates(offset = 0) {
    currentStartDate.setDate(currentStartDate.getDate() + offset);
    visibleDates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(currentStartDate);
      date.setDate(currentStartDate.getDate() + i);
      visibleDates.push(date);
    }
  }

  function renderDates() {
    dateSlider.innerHTML = "";
    visibleDates.forEach((date) => {
      const dateItem = document.createElement("div");
      dateItem.className = "date-item";
      const day = date.getDay();
      if (day === 0) dateItem.classList.add("weekday-sun");
      if (day === 6) dateItem.classList.add("weekday-sat");

      const dateNum = date.getDate();
      const weekdayName = getWeekdayName(day);

      dateItem.innerHTML = `
        <div class="date-day ${isSameDate(date, selectedDate) ? "selected" : ""}">${dateNum}</div>
        <div class="date-weekday">${weekdayName}</div>
      `;

      dateItem.addEventListener("click", () => {
        selectedDate = date;
        renderDates();
        window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }));
      });

      dateSlider.appendChild(dateItem);
    });
  }

  function updateMonthDisplay() {
    const firstDate = visibleDates[0];
    currentMonthDisplay.textContent = `${firstDate.getFullYear()}.${firstDate.getMonth() + 1}`;
  }

  function getWeekdayName(day) {
    return ["일", "월", "화", "수", "목", "금", "토"][day];
  }

  function isSameDate(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }
  
  window.dispatchEvent(new CustomEvent("dateChanged", { detail: selectedDate }));
});
