window.addEventListener("load", function () {
    // 1. 외부데이터 가져오기
    const fileName = "tour.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileName);
    xhr.send();

    // readystatechange : HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될 때마다 발생
    xhr.onreadystatechange = function (event) {
        if (event.target.readyState === XMLHttpRequest.DONE) {
            // readyState : 로딩 상태 확인
            const res = event.target.response;
            // 전달받은 문자열을 js에서 사용하도록 해석 -> 객체화{원시데이터묶음} 하기.
            // JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환
            const json = JSON.parse(res);
            //html 태그 만드는 함수 호출하기
            makeHtmlTag(json);
        }
    };

    //html 태그 만드는 함수 생성
    function makeHtmlTag(_res) {
        // 2. html 태그를 백틱을 이용해 만든다.
        let htmlTourTag = ``;
        //json 파일에서 받아온 데이터를 가져온다?
        for (let i = 0; i < _res.total; i++) {
            const index = i + 1;
            /*
            _res.good_1
            const total = _res.total;
            const good1 = _res.good_1;
            const good1 = _res["good_1"];
            const good1 = _res["good_" + 1];
            const good1 = _res["good_" + 2];
            const good1 = _res["good_" + index];
            */
            const obj = _res["good_" + index];
            // html 태그를 작성하자. 반복되는 부분 중, 바꿀 부분은 ${} 이용!
            const tempTag = `
            <div class="swiper-slide">
                <div class="tour-slide-item">
                    <a href="${obj.url}" class="tour-link">
                        <div class="tour-img">
                        <img src="${obj.image}" alt="${obj.desc}" />
                        </div>
                        <div class="tour-info">
                        <ul class="tour-good-list">
                            <li>
                            <span class="tour-good-info-price">
                                <b>${obj.discount}</b>
                                <em>${obj.price}</em>
                                원
                            </span>
                            </li>
                            <li>
                            <p class="tour-good-info-desc">
                            ${obj.desc}
                            </p>
                            </li>
                        </ul>
                        </div>
                    </a>
                </div>
            </div>
            
            `;
            htmlTourTag += tempTag;
        }
        // swiper 영역에 html을 출력하는 함수 호출
        showHtmlTag(htmlTourTag);
    }

    // swiper 영역에 html을 출력하는 함수 생성
    function showHtmlTag(_html) {
        // swiper 태그영역에 html 태그를 배치한다?
        const tourSlide = ".tour-main-slide .swiper-wrapper";
        const tag = document.querySelector(tourSlide);
        tag.innerHTML = _html;
        // swiper 작동시키기
        const swiperTour = new Swiper(".tour-main-slide", {
            slidesPerView: 3,
            spaceBetween: 26,
            navigation: {
                prevEl: ".tour-main-slide-wrap .slide-prev-button",
                nextEl: ".tour-main-slide-wrap .slide-next-button",
            },
            // 슬라이드 3장씩 이동하라!
            slidesPerGroup: 3,
        });
    }
});
