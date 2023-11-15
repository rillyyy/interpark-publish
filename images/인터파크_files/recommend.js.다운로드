/*
모든 js는 html 태그를 로드 완료하고, 실행해야 안전하다
그런데, 현재 .js파일을 head 태그에서 불러들이므로 불안전하다
오류가 날 확률이 높다
how to elude error ?
*/
/*
1.(비추)
아래의 window는 웹브라우저다. onload는 무조건 소문자로 작성!(약속임)
웹 브라우저의 html, css, js, image.. 로드 완료하면, function을 한다!
window.onload 는 하나밖에 없기에, 다른 곳에서 작성해도 제일 마지막에 
쓴것만 덮여져 적용된다. 
우리는 파일을 분리해서 써야하기에, 모두 적용된걸 원함.
*/
// window.onload = function () {}
/*
2.(추천방법)
1과 2는 하는 일은 같다. 
*/
window.addEventListener("load", function () {
  // 추천 상품 슬라이드 기능
  // [의사코딩]글로써, 코딩 시나리오를 작성한다
  // 1. 외부 데이터를 불러온다
  // : 외부 데이터 파일명.json
  const fileName = "recommend.json";

  // 외부 데이터 가져올 때, 작성법
  const xhr = new XMLHttpRequest();

  // 외부의 파일을 열어라!
  // Get 방식으로 파일을 열어준다.
  xhr.open("GET", fileName);
  // 실제로 실행하자.
  xhr.send();
  // 데이터의 전송 상태를 체크한다.
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);
      // 코드가 가독성이 떨어지므로, 변수에 담는다.
      // 규칙은 const 부터 작성하자
      // const 가 문제가 된다면 let 으로 변경한다.
      const res = event.target.response;
      // resp를 전달하여 html 태그를 만든다.
      // 데이터를 정리하여 전달하는 것이 관례 **
      const json = JSON.parse(res);
      // 전달받은 문자열을 js 에서 사용하도록,
      // 해석하여 객체화 {원시데이터 묶음} 한다.
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // console.log(_res);
    // 2. html 태그를 백틱을 이용해서 만든다.
    let htmlRecommendTag = ``;
    // _res 에 담겨진 객체에서 total 을 보관한다.
    for (let i = 0; i < _res.total; i++) {
      // 가독성이 떨어진다.
      const index = i + 1;
      /*
            _res.good_1;
            _res["good_2"];
            _res["good_" + 3];
            const obj = "good_" + index;
            const obj = _res["good_" + index];
            */
      //const obj = "good_" + index;
      const obj = _res["good_" + index];
      // console.log(obj);

      let tempTag = ``; // 미리 백틱넣어줄거라는 의미로 백틱작성.
      // 마지막 json에서는 url만 읽어들인다
      // 그렇지 않으면, 일반적으로 모두 출력한다.
      if (i === _res.total - 1) {
        // 여기서 바로가기 버튼을 출력한다.
        tempTag = `
                <div class="swiper-slide">
                바로가기
                </div>
                `;
      } else {
        // 여기서 일반적인 코드를 출력한다.
        tempTag = `
                <div class="swiper-slide">
                    <div class="recommend-slide-item">
                        <a href="${obj.url}" class="tour-link">
                            <div class="recommend-img">
                            <img src="${obj.image}" alt="${obj.desc}" />
                            </div>
                            <div class="recommend-info">
                            <ul class="recommend-good-list">
                                <li>
                                <span class="recommend-good-info-price">
                                    <b>${
                                      obj.discount ? obj.discount + "%" : ""
                                    }</b>
                                    <em>${obj.price}</em>
                                    원
                                </span>
                                </li>
                                <li>
                                <p class="recommend-good-info-desc">
                                ${obj.desc}
                                </p>
                                </li>
                            </ul>
                            </div>
                        </a>
                    </div>
                </div>
            `;
      }
      htmlRecommendTag += tempTag;
    }
    showHtmlTag(htmlRecommendTag);
  }

  // html 출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    // console.log(_html);
    // 3. swiper 태그에 백틱을 배치한다.
    const recommendSlide = ".recommend-main-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;
    // swiper 만들고 실행하기.
    makeSwiper();
  }

  function makeSwiper() {
    // 4. swiper 작동시킨다
    const swiperRecommend = new Swiper(".recommend-main-slide", {
      slidesPerView: 4, // 한 화면에 보여지는 슬라이드 갯수
      spaceBetween: 27, // 슬라이드 사이의 여백?
      // 좌,우측 이동 버튼
      navigation: {
        prevEl: ".recommend-main-slide-wrap .slide-prev-button",
        nextEl: ".recommend-main-slide-wrap .slide-next-button",
      },
      // 슬라이드 4장씩 이동하라!
      slidesPerGroup: 4,
    });
  }
});
