window.addEventListener("load", function () {
  // json 데이터 가져오기
  const fileName = "ticket.json";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      // 받아온 데이터를 js에서 사용하도록 해석
      const json = JSON.parse(res);
      // html 태그 만드는 함수 호출
      makeHtmlTag(json);
    }
  };
  // html 태그 만드는 함수 생성
  function makeHtmlTag(_data) {
    let htmlTicketTag = ``;
    // const total = _res.total;
    for (let i = 0; i < _data.total; i++) {
      // 1-8까지 반복
      const index = i + 1;
      const obj = _data["ticket_" + index];
      //   console.log(obj);

      // html 코드
      let tempTag = `<div class="swiper-slide">
                      <div class="ticket-slide-item">
                        <a href="${obj.url}" class="ticket-link">
                          <div class="ticket-img">
                            <img src="${obj.image}" alt="" />
                          </div>
                          <div class="ticket-info">
                            <ul class="ticket-good-list">
                              <li>
                                <div class="ticket-good-title">
                                ${obj.title}
                                </div>
                              </li>
                              <li>
                                <div class="ticket-good-where">
                                ${obj.where}
                                </div>
                              </li>
                              <li>
                                <div class="ticket-good-date">
                                ${obj.day}
                                </div>
                              </li>
                              <li>
                                <div class="ticket-good-state">${obj.state}</div>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>`;
      htmlTicketTag += tempTag;
    }
    // swiper 에 배치하는 함수 호출
    showHtmlTag(htmlTicketTag);
  }
  // swiper 에 배치하는 함수 생성
  function showHtmlTag(_html) {
    const tag = document.querySelector(".ticket-main-slide .swiper-wrapper");
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperTicket = new Swiper(".ticket-main-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
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
