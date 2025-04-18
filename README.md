# visitkorea-project
대한민국 구석구석 사이트([Visit Korea](https://korean.visitkorea.or.kr)) 클론 코딩 프로젝트

### 팀원
김효준 손혜정

# 📖 기능 구현 안내

## 📌 네비게이션 바 (Navigation)
- **현재 페이지 강조**  
  현재 보고 있는 페이지는 **밑줄**로 표시되어 시각적으로 구분됩니다.
- **드롭다운 메뉴**  
  마우스를 네비게이션 항목에 올리면 **드롭다운 메뉴**가 나타납니다.  
  드롭다운 항목 클릭 시 해당 **페이지로 이동**합니다.

## 🎞️ 메인 슬라이드 (Main Slide)
- **자동 슬라이드**  
  슬라이드는 **4초 간격**으로 자동으로 넘어갑니다.
- **수동 슬라이드**  
  ⬅️ ➡️ 버튼 클릭 시, 선택한 **방향에 맞춰 슬라이드 이동**이 가능합니다.
- **재생/정지 기능**  
  ▶️ ⏸️ 버튼을 눌러 슬라이드의 **자동 재생을 멈추거나 다시 시작**할 수 있습니다.

  마우스를 아이콘에 올리면 **아이콘 이미지가 변경**됩니다.
- **배너 링크**  
  링크가 연결된 배너를 클릭하면 **해당 페이지로 이동**합니다.

### 기술 스택
- HTML, CSS (Vanilla)
- JavaScript
- Git & GitHub

### Commit Message Conventions

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README 등) |
| `style` | 코드 포맷팅 (기능/로직 변경 없음) |
| `refactor` | 리팩토링 |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 빌드/패키지/환경 설정 등 잡일 |

### Directory Structure

```
├── data
│   ├── festivalData.js
│   ├── travelData.js
│   ├── travelProductData.js
│   └── travelTagData.js
├── icons
├── images
├── scripts
│   ├── calendar.js
│   ├── festival.js
│   ├── footer.js
│   ├── script.js
│   ├── travel.js
│   └── travelProductList.js
├── styles
│   ├── festival.css
│   ├── footer.css
│   ├── location-month-modal.css
│   ├── nav.css
│   ├── slider.css
│   ├── styles.css
│   ├── travel.css
│   └── travelProductList.css
├── footer.html
├── index.html
└── travel.html
```


