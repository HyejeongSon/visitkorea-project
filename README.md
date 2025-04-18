# visitkorea-project
대한민국 구석구석 사이트([Visit Korea](https://korean.visitkorea.or.kr)) 클론 코딩 프로젝트

## 팀원
| 이름 | 담당 업무 | GitHub |
|:--:|:--|:--:|
| **손혜정** | • AWS S3 정적 웹 사이트 배포<br>• 축제 캘린더 제작<br>• 여행정보 > 여행상품 페이지 제작 | [@HyejeongSon](https://github.com/HyejeongSon) |
| **김효준** | • 네비게이션 제작<br>• 푸터 제작<br>• 메인 슬라이더 구현 | [@Hyo-joon](https://github.com/Hyo-joon) |

## AWS S3 정적 웹 호스팅

### http://www.visitkorea.store/

# 📖 기능 구현 안내

## 네비게이션 바 (Navigation)
- **현재 페이지 강조**
   
  현재 보고 있는 페이지는 **밑줄**로 표시되어 시각적으로 구분됩니다.

- **드롭다운 메뉴**
  
  - 마우스를 네비게이션 항목에 올리면 **드롭다운 메뉴**가 나타납니다.
  - 드롭다운 항목 클릭 시 해당 **페이지로 이동**합니다.

## 메인 슬라이드 (Main Slide)

- **자동 슬라이드**
  
  슬라이드는 **4초 간격**으로 자동으로 넘어갑니다.
  
  ![슬라이드 (online-video-cutter com)](https://github.com/user-attachments/assets/2bae83ce-4e83-4f71-af8a-3063001c0c4b)

- **수동 슬라이드, 재생/정지 기능**
 
  - ⬅️ ➡️ 버튼 클릭 시, 선택한 **방향에 맞춰 슬라이드 이동**이 가능합니다.
  - ▶️ ⏸️ 버튼을 눌러 슬라이드의 **자동 재생을 멈추거나 다시 시작**할 수 있습니다.
    
  ![202504-18-10_cropped](https://github.com/user-attachments/assets/5b90e30f-5017-447b-b808-99872f73cd99)

## 푸터 (Footer)
- **아이콘 호버 효과**
  
  마우스를 아이콘에 올리면 **아이콘 이미지가 변경**됩니다.
  
  ![푸터 아이콘 (online-video-cutter com)](https://github.com/user-attachments/assets/a66b8c7f-b492-4301-bc89-519719415847)

- **배너 링크**

  링크가 연결된 배너를 클릭하면 **해당 페이지로 이동**합니다.
  
  ![푸터 클릭 (online-video-cutter com)](https://github.com/user-attachments/assets/66cb142e-0695-4d10-b526-0fcabab7afec)

## 축제 캘린더 (Festival Calendar)

- 날짜별 축제 일정을 확인합니다.

  ![202504-18-15_cropped](https://github.com/user-attachments/assets/5f48656e-12ad-4826-9807-de53f5f6261f)

## 여행 상품 (Travel Product)

- 여행 상품을 조회합니다.
  
  - Title 검색
    
    ![202504-18-6](https://github.com/user-attachments/assets/c4383944-b39a-4f93-a08f-c513187a3375)

  - 랜덤 추천
    
    ![202504-18-5](https://github.com/user-attachments/assets/a8d583f2-114e-4d1d-a018-8af96cdec61e)

  - 지역/월/태그 검색
    
    ![202504-18-7](https://github.com/user-attachments/assets/7b273330-78ac-4b6e-96d5-b53dc0693cfe)


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


