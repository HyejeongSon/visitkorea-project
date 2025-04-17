const travelProductData = [
  {
    "id": 1,
    "name": "[부산] 힐링 투어 상품",
    "region": "부산",
    "minPrice": 136327,
    "startDate": "2024-06-26",
    "endDate": "2026-12-25",
    "tags": ["투어패스","바다여행",  "투어패스"],
    "img": "https://www.busan.go.kr/comm/getImage?srvcId=MEDIA&upperNo=20068&fileTy=MEDIA&fileNo=1"
  },
  {
    "id": 2,
    "name": "[전남] 액티비티 투어 상품",
    "region": "전남",
    "minPrice": 260050,
    "startDate": "2024-02-05",
    "endDate": "2025-09-17",
    "tags": ["체험이_있는_여행", "가자타고_편하게","액티비티",  "투어패스"],
    "img": "https://cdnweb01.wikitree.co.kr/webdata/editor/202410/23/img_20241023025811_a6ac6799.webp"
  },
  {
    "id": 3,
    "name": "[충북] 미식 투어 상품",
    "region": "충북",
    "minPrice": 153332,
    "startDate": "2024-03-16",
    "endDate": "2025-11-06",
    "tags": ["SRT여행",  "투어패스",  "가자타고_편하게"],
    "img": "https://www.inews365.com/data/photos/20230208/art_16771273952378.jpg"
  },
  {
    "id": 4,
    "name": "[제주] 힐링 투어 상품",
    "region": "제주",
    "minPrice": 160190,
    "startDate": "2024-07-06",
    "endDate": "2026-08-14",
    "tags": ["제주도", "가자타고_편하게","투어패스"],
    "img": "https://www.agoda.com/wp-content/uploads/2024/07/Jeju-Island-1244x700.jpg"
  },
  {
    "id": 5,
    "name": "[대구] 자연 투어 상품",
    "region": "대구",
    "minPrice": 233591,
    "startDate": "2024-04-22",
    "endDate": "2026-08-20",
    "tags": ["투어패스","SRT여행"],
    "img": "https://image.foresttrip.go.kr/frip/8773eb39-1ca8-4606-8483-83ef63496bf7.jpg"
  },
  {
    "id": 6,
    "name": "[인천] 역사탐방 투어 상품",
    "region": "인천",
    "minPrice": 295641,
    "startDate": "2024-05-01",
    "endDate": "2025-05-18",
    "tags": ["케이블카","체험이_있는_여행",],
    "img": "https://www.agoda.com/wp-content/uploads/2024/01/Incheon-Incheon-Landing-Operation-Memorial-Hall.jpg"
  },
  {
    "id": 7,
    "name": "[부산] 미식 투어 상품",
    "region": "부산",
    "minPrice": 254239,
    "startDate": "2024-09-23",
    "endDate": "2026-10-22",
    "tags": ["가자타고_편하게", "청년마을","바다여행"],
    "img": "https://www.visitbusan.net/uploadImgs/files/cntnts/20201016163155115"
  },
  {
    "id": 8,
    "name": "[부산] 액티비티 투어 상품",
    "region": "부산",
    "minPrice": 228143,
    "startDate": "2024-01-28",
    "endDate": "2026-08-16",
    "tags": ["체험이_있는_여행", "액티비티","바다여행"],
    "img": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1ATYpq.img?w=600&h=400&m=6"
  },
  {
    "id": 9,
    "name": "[강원] 미식 투어 상품",
    "region": "강원",
    "minPrice": 132193,
    "startDate": "2024-02-10",
    "endDate": "2025-08-08",
    "tags": ["반려동물_동반", "가자타고_편하게"],
    "img": "https://files.ban-life.com/content/2024/02/body_1707204141.jpg"
  },
  {
    "id": 10,
    "name": "[세종] 역사탐방 투어 상품",
    "region": "세종",
    "minPrice": 25152,
    "startDate": "2024-10-26",
    "endDate": "2025-10-28",
    "tags": ["체험이_있는_여행", "투어패스", "가자타고_편하게"],
    "img": "https://blog.kakaocdn.net/dn/bbnVmf/btsratPxorp/gJ6UjgVb8LtH66vuwJrVcK/img.jpg"
  },
  {
    "id": 11,
    "name": "[서울] 반려동물 미식 투어 상품",
    "region": "서울",
    "minPrice": 202396,
    "startDate": "2024-05-01",
    "endDate": "2026-12-25",
    "tags": ["청년마을","반려동물_동반"],
    "img": "https://month.foodbank.co.kr/php_uploader/upload/%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25B0%25EC%2583%25B7%2B2023-05-08%2B%25EC%2598%25A4%25ED%259B%2584%2B3.01.47.png"
  },
  {
    "id": 12,
    "name": "[제주] 액티비티 투어 상품",
    "region": "제주",
    "minPrice": 187732,
    "startDate": "2024-08-07",
    "endDate": "2026-09-07",
    "tags": ["제주", "체험이_있는_여행","케이블카"],
    "img": "https://cdn.jejusori.net/news/photo/201408/150582_170294_2446.jpg"
  },
  {
    "id": 13,
    "name": "[전남] 전주 한옥마을 여행",
    "region": "전남",
    "minPrice": 193315,
    "startDate": "2024-07-19",
    "endDate": "2026-10-09",
    "tags": ["체험이_있는_여행",   "가자타고_편하게"],
    "img": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=1a802bf2-2628-4d77-bfe5-19bef8d0ece2"
  },
  {
    "id": 14,
    "name": "[전남] 미식 투어 상품",
    "region": "전남",
    "minPrice": 41884,
    "startDate": "2024-02-07",
    "endDate": "2026-02-14",
    "tags": ["가자타고_편하게", "투어패스"],
    "img": "https://cdn.emetro.co.kr/data2/content/image/2022/02/10/.cache/512/20220210500232.jpg"
  },
  {
    "id": 15,
    "name": "[경북] 경주 역사 유적지 탐방",
    "region": "경북",
    "minPrice": 26764,
    "startDate": "2024-12-18",
    "endDate": "2026-10-24",
    "tags": [ "참신마을","SRT여행"],
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2SUHEGrMVpLQANaQTfhR7jIC0TF-2TVpuA&s"
  },
  {
    "id": 16,
    "name": "[세종] 힐링 투어 상품",
    "region": "세종",
    "minPrice": 232393,
    "startDate": "2024-08-09",
    "endDate": "2026-09-02",
    "tags": ["참신마을", "SRT여행"],
    "img": "https://cdn.expressnews.co.kr/news/photo/202008/202928_203631_2424.jpg"
  },
  {
    "id": 17,
    "name": "[강원] 강릉 커피거리 & 바다",
    "region": "강원",
    "minPrice": 172060,
    "startDate": "2024-01-24",
    "endDate": "2025-10-09",
    "tags": ["바다여행"],
    "img": "https://mblogthumb-phinf.pstatic.net/MjAyMzA1MjhfNDAg/MDAxNjg1MjA3MTQxNTI4.t-giyU5oXrDccOE_A4HdyPuOR7spggY-ZeXeA3W3C58g.m-tqKebDPALwInbuWnPVv85TsT9JnrDf_wQJYcOlyNgg.JPEG.dssa1020/SE-843dacb6-5571-43c2-9bf0-990fb8edd711.jpg?type=w800"
  },
  {
    "id": 18,
    "name": "[대구] 힐링 투어 상품",
    "region": "대구",
    "minPrice": 169588,
    "startDate": "2024-09-08",
    "endDate": "2025-09-23",
    "tags": ["투어패스","가자타고_편하게","참신마을","DMZ"],
    "img": "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/fpaf/image/5LhUukxGigZuvLvY1WM75s-TpuA.png"
  },
  {
    "id": 19,
    "name": "[대전] 자연 투어 상품",
    "region": "대전",
    "minPrice": 48383,
    "startDate": "2024-11-24",
    "endDate": "2025-01-24",
    "tags": ["울릉도&독도", "투어패스", "반려동물_동반"],
    "img": "https://monthly.chosun.com/upload/0904/0904_b226.jpg"
  },
  {
    "id": 20,
    "name": "[광주] 자연 투어 상품",
    "region": "광주",
    "minPrice": 223709,
    "startDate": "2024-10-15",
    "endDate": "2026-06-04",
    "tags": ["바다여행", "울릉도&독도","DMZ"],
    "img": "https://dn.joongdo.co.kr/mnt/images/file/2017y/02m/01d/20170201000019197_1.jpg"
  },
  {
    "id": 21,
    "name": "[충북] 자연 투어 상품",
    "region": "충북",
    "minPrice": 191554,
    "startDate": "2024-08-24",
    "endDate": "2025-06-04",
    "tags": [ "울릉도&독도","DMZ"],
    "img": "https://image.ajunews.com/content/image/2023/06/01/20230601090154361816.jpg"
  },
  {
    "id": 22,
    "name": "[광주] 액티비티 투어 상품",
    "region": "광주",
    "minPrice": 128733,
    "startDate": "2024-10-09",
    "endDate": "2026-08-11",
    "tags": ["투어패스", "액티비티","가자타고_편하게","체험이_있는_여행"],
    "img": "https://leisure-web.yanolja.com/_next/image?url=https%3A%2F%2Fimage6.yanolja.com%2Fleisure%2Fa5sFVSJrefCzu1oW&w=3840&q=90"
  },
  {
    "id": 23,
    "name": "[경북] 자연 투어 상품",
    "region": "경북",
    "minPrice": 228247,
    "startDate": "2024-04-12",
    "endDate": "2025-02-17",
    "tags": ["SRT여행", "가자타고_편하게"],
    "img": "https://cdn.latimes.kr/news/photo/202309/50922_62029_5447.jpg"
  },
  {
    "id": 24,
    "name": "[대전] 맛집 투어 상품",
    "region": "대전",
    "minPrice": 147153,
    "startDate": "2024-03-25",
    "endDate": "2026-04-28",
    "tags": ["SRT여행","가자타고_편하게","참신마을","DMZ","울릉도&독도"],
    "img": "https://blog.lgchem.com/wp-content/uploads/2014/10/ssd_1030-1.jpg"
  },
  {
    "id": 25,
    "name": "[서울] 야경 투어 상품",
    "region": "서울",
    "minPrice": 41867,
    "startDate": "2024-03-15",
    "endDate": "2026-11-12",
    "tags": ["참신마을",  "투어패스",  "울릉도&독도", "케이블카"],
    "img": "https://img.freepik.com/free-photo/downtown-cityscape-night-seoul-south-korea_335224-272.jpg"
  },
  {
    "id": 26,
    "name": "[제주] 자연 투어 상품",
    "region": "제주",
    "minPrice": 187640,
    "startDate": "2024-08-13",
    "endDate": "2025-12-06",
    "tags": ["투어패스", "청년마을","울릉도&독도","케이블카"],
    "img": "https://img1.yna.co.kr/photo/yna/YH/2011/11/12/PYH2011111201190005600_P4.jpg"
  },
  {
    "id": 27,
    "name": "[경남] 액티비티 투어 상품",
    "region": "경남",
    "minPrice": 245922,
    "startDate": "2024-06-26",
    "endDate": "2026-07-10",
    "tags": ["청년마을","DMZ","울릉동&독도"],
    "img": "https://mblogthumb-phinf.pstatic.net/MjAyMzA5MDVfMTcz/MDAxNjkzODQ4NDEwNzAx.1sxIHMmYAJH-ipXVIjydUTsfijlkli0tulBJ-p0mD4Yg.0laqyaKOGU-lW-0p__oMOygv2Ze8GA1bje1FiKQIp5Yg.JPEG.lcu99/IMG_0483.jpg?type=w800"
  },
  {
    "id": 28,
    "name": "[대전] 액티비 투어 상품",
    "region": "대전",
    "minPrice": 77675,
    "startDate": "2024-05-04",
    "endDate": "2026-12-08",
    "tags": ["가자타고_편하게", "바다여행","SRT여행","청년마을","DMZ","울릉동&독도"],
    "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/c3/6d/b1/caption.jpg?w=500&h=500&s=1"
  },
  {
    "id": 29,
    "name": "[대구] 액티비티 투어 상품",
    "region": "대구",
    "minPrice": 34873,
    "startDate": "2024-05-26",
    "endDate": "2025-03-13",
    "tags": ["DMZ", "액티비티", "청년마을"],
    "img": "https://cdn.st-news.co.kr/news/photo/202205/4916_14272_2559.jpeg"
  },
  {
    "id": 30,
    "name": "[제주] 역사탐방 투어 상품",
    "region": "제주",
    "minPrice": 219305,
    "startDate": "2024-10-28",
    "endDate": "2025-09-03",
    "tags": ["체험이_있는_여행",  "반려동물_동반",],
    "img": "https://www.much.go.kr/cooperation/images/haen_introimg.jpg"
  }
]