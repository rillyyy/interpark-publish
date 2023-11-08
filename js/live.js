window.addEventListener("load", function () {
  // 외부데이터 연동
  const xh = new XMLHttpRequest();
  xh.open("GET", "live.json");
  xh.send();
  xh.onreadystatechange = function (event) {
    // console.log(event.target.response);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      // 현재 화면 출력에 활용을 하지는 않고 있다.
      makeHtmlTag(json);
    }
  };

  // html태그 만드는 함수 생성
  function makeHtmlTag(_data) {
    //미리 백틱을 쓰겠다고 선언하는,...의미^^?
    let htmlLiveTag = ``;

    for (let i = 0; i < _data.total; i++) {
      const index = i + 1;
      const obj = _data["live_" + index];
      // console.log(obj);

      // 해당 swiper 태그 넣어주기 (swiper를 반복해 생성해야 하므로)
      let tempTag = `
      <div class="swiper-slide">
      <div class="live-slide-item">
        <!-- 기본정보 -->
        <div class="live-slide-link">
          <!-- 기본정보 출력 -->
          <a href="${obj.url}" class="live-slide-item-info">
            <div class="live-img">
              <img src="${obj.image}" alt="" />
            </div>
            <div class="live-info">
              <span class="live-info-title">${obj.state}</span>
              <div class="live-info-desc">
              ${obj.title}
              </div>
            </div>
            <div class="live-desc">
              <div class="live-desc-wrap">
                <div class="live-desc-date">${obj.date}</div>
                <div class="live-desc-time"><b>${obj.time}</b></div>
              </div>
            </div>
          </a>
        </div>
        <!-- 제품정보 -->
        <a href="${obj.good_url}" class="live-slide-good-link">
          <div class="live-slide-item-good">`;

      if (obj.good_image) {
        tempTag += `<div class="live-good-img">
              <img src="${obj.good_image}" alt="" />
            </div>`;
      }

      tempTag += `<div class="live-good-info">
              <div class="live-good-info-title">
                <span>${obj.good_title ? obj.good_title : ""}</span>
              </div>
              <div class="live-good-info-desc">
                <span class="live-good-info-discount">${
                  obj.good_discount ? obj.good_discount + "%" : ""
                }</span>
                <span class="live-good-info-price"
                  ><b>${obj.good_price ? obj.good_price + "원" : ""}</b></span
                >
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
      `;
      htmlLiveTag += tempTag;
    }
    showHtmlTag(htmlLiveTag);
    // console.log(showHtmlTag);
  }

  // html 태그를 swiper 영역에 배치할 함수 생성
  function showHtmlTag(_html) {
    // html 의 해당영역 태그를 가져와, 배치할 함수에 넣어준다?
    const tag = document.querySelector(".live-main-slide .swiper-wrapper");
    // 해당 html 태그영역 안에 html 반복 생성함수 넣어주기!
    tag.innerHTML = _html;

    // swiper 함수 호출
    makeSwiper();
  }

  function makeSwiper() {
    const swiperLive = new Swiper(".live-main-slide", {
      slidesPerView: 4, // 한 화면에 보여지는 슬라이드 갯수
      spaceBetween: 28, // 슬라이드 사이의 여백?
      // 좌,우측 이동 버튼
      navigation: {
        prevEl: ".live-main-slide-wrap .slide-prev-button",
        nextEl: ".live-main-slide-wrap .slide-next-button",
      },
      // 슬라이드 4장씩 이동하라!
      slidesPerGroup: 4,
    });
  }
});
