window.addEventListener("load", function () {
  // visual 슬라이드 데이터 연동

  // 백엔드 Response 데이터
  // 변수 선언시, 일단 const로 먼저 선언한다. 필요에 의해 let 으로 바꾼다. 그래도 안되면 var 쓰기!
  // http를 통해 요청한다. XML 을!
  const xh = new XMLHttpRequest();
  // visual.json을 가져다줘!
  xh.open("GET", "visual.json");
  //xh로 전송?
  xh.send();

  xh.onreadystatechange = function (event) {
    //   console.log(event.target);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 문자열을 js에서 사용하는 json 데이터로 변환!
      //json object로 해석(parse)하라. 그 결과를 변수에 저장(할당).
      const result = JSON.parse(event.target.response);
      // 현재 화면 출력에 활용을 하지는 않고 있다.
      makeVisualSlideHtml(result);
    }
  };

  //visual 슬라이드 내용 채우는 기능
  function makeVisualSlideHtml(_data) {
    const visualRes = _data;
    //출력을 시켜줄 문장을 만들자.
    let visualHtml = "";

    //total 만큼 반복하자.
    // for 은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 1; i <= visualRes.total; i++) {
      let temp = `
<div class="swiper-slide">
  <div class="visual-slide-item">
    <a href="${visualRes["visual_" + i].url}">
      <img src="${visualRes["visual_" + i].file}" alt="${
        visualRes["visual_" + i].url
      }" />
    </a>
  </div>
</div>
`;
      visualHtml += temp;
    }

    // 어디에 자료를 출력할 것인지 지정
    // html의 swiper-wrapper 에 출력하고 싶다!
    // 만약 slide 가 0개이면, 해당 영역에 출력되면 안됨.
    // slide 숫자만큼 자동으로 해당 영역에 출력되면 간단!
    //document 는 html을 일컫음.
    const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
    visualSlide.innerHTML = visualHtml;

    var swiper = new Swiper(".visual-slide", {
      slidesPerView: 2, //슬라이드 갯수
      spaceBetween: 24, //보여지는 슬라이드 간의 간격(여백)
      loop: true, // infinite loop(무한루프)
      autoplay: {
        delay: 1000, // 대기시간
        disableOnInteraction: false, // 사용자 터치 후, 자동실행 다시 하도록.
      }, // auto play
      speed: 500, //이동 속도 : 1000은 1초
      navigation: {
        nextEl: ".visual-slide-prev",
        prevEl: ".visual-slide-next",
      }, // 좌,우측 이동
    });
  }
});

/*
swiper 는 만약 loop:true 라고 옵션이 있으면,
1개의 슬라이드라도 몰래 html 태그를 복사하여 3개를 만들어준다
*/
