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
    function makeHtmlTag(_res) {
        // const total = _res.total;
        for (let i = 0; i < _res.total; i++) {
            // 1-8까지 반복
            const index = i + 1;
            const obj = _res["good_" + index];
            console.log(obj);

            // html 코드 







        }

        // swiper 에 배치하는 함수 호출
        showHtmlTag(obj);
    }
    // swiper 에 배치하는 함수 생성
    function showHtmlTag() {}
});
