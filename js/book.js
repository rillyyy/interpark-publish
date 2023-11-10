window.addEventListener("load", function () {
  const xh = new XMLHttpRequest();
  xh.open("GET", "book.json");
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
      const obj = _data["book_" + index];
      // console.log(obj);

      // 해당 swiper 태그 넣어주기 (swiper를 반복해 생성해야 하므로)
      let tempTag = `
      <div class="swiper-slide">
                      <div class="book-slide-item">
                        <a href="${obj.url}">
                          <div class="book-img">
                            <img src="${obj.image}" alt="" />
                            <div class="book-rank">0</div>
                          </div>
                          <div class="book-info">
                            <ul>
                              <li>
                                <div class="book-title">${obj.title}</div>
                              </li>
                              <li>
                                <div class="book-author">${obj.author}</div>
                              </li>
                              <li>
                                <div class="book-price">
                                  <span><b>${obj.price}</b>원</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>
                    `;
      htmlLiveTag += tempTag;
    }
    showHtmlTag(htmlLiveTag);
  }

  // html 태그를 swiper 영역에 배치할 함수 생성
  function showHtmlTag(_html) {
    // html 의 해당영역 태그를 가져와, 배치할 함수에 넣어준다?
    const tag = document.querySelector(".book-main-slide .swiper-wrapper");
    // 해당 html 태그영역 안에 html 반복 생성함수 넣어주기!
    tag.innerHTML = _html;

    // swiper 함수 호출
    makeSwiper();
  }

  function makeSwiper() {
    const swiperLive = new Swiper(".book-main-slide", {
      slidesPerView: 5, // 한 화면에 보여지는 슬라이드 갯수
      spaceBetween: 28, // 슬라이드 사이의 여백?
      // 좌,우측 이동 버튼
      navigation: {
        prevEl: ".book-main-slide-wrap .slide-prev-button",
        nextEl: ".book-main-slide-wrap .slide-next-button",
      },
      // 슬라이드 4장씩 이동하라!
      slidesPerGroup: 5,
    });
  }
});
