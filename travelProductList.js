document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.querySelector(".filter-button")
    const searchButton = document.querySelector(".search-button")
  
    // HTML에 이미 존재하는 productListContainer 가져오기
    const productListContainer = document.querySelector("#product-list")
  
    // 초기에는 숨김 상태
    productListContainer.style.display = "none"
  
    // 랜덤 추천 버튼 클릭 시 동작
    filterButton.addEventListener("click", () => {
      generateRandomRecommendations()
  
      // 리스트 표시
      productListContainer.style.display = "block"
  
      // 스크롤 이동
      setTimeout(() => {
        productListContainer.scrollIntoView({ behavior: "smooth" })
      }, 100)
    })
  
    // 랜덤 추천 상품 생성 함수
    function generateRandomRecommendations() {
      // 기존 내용 초기화
      productListContainer.innerHTML = ""
  
      // 제목 추가
      const title = document.createElement("h2")
      title.className = "product-list-title"
      title.textContent = "어디로 갈지 고민이라면, 이런 여행 어때요?"
      productListContainer.appendChild(title)
  
      // 상품 그리드 생성
      const productGrid = document.createElement("div")
      productGrid.className = "product-grid"
  
      // 랜덤으로 최대 8개 선택
      const shuffledProducts = [...travelProductData].sort(() => 0.5 - Math.random())
      const selectedProducts = shuffledProducts.slice(0, 8)
  
      // 상품 카드 추가
      selectedProducts.forEach(product => {
        const card = createProductCard(product)
        productGrid.appendChild(card)
      })
  
      productListContainer.appendChild(productGrid)
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
        </div>
      `
      return card
    }
  })