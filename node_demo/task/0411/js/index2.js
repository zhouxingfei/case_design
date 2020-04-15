let caseceFlowModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = null;

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                _data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }

    let bindHTML = function bindHTML() {
        _data.map(item => {
            let w = item.width,
                h = item.height;
            //h1/h  230/w
            h = h / (w / 230);
            item.height = h;
            item.width = 230;
            return item;
        });
        for (let i = 0; i < _data.length; i += 5) {
            let ground = _data.slice(i, i + 5);
            ground.sort((a, b) => {
                return a.height - b.height;
            });
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            ground.forEach((item, index) => {
                let { pic,
                    title,
                    height,
                    link } = item;
                let card = document.createElement('div');
                let str = `<div class="card" >
                            <a href="${link}">
                                <div class="lazyImageBox" style="height:${height}px"><img src="" alt="" data-img="${pic}"></div>
                                <p>${title}</p>
                            </a>
                        </div>`;
                card.innerHTML = str;
                columns[index].appendChild(card);
            });
        }
    }
    let lazyFun = function lazyFun() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            let isLoad = lazyImageBox.getAttribute('isLoad');
            console.log(isLoad);
            if (isLoad == 'true') return;
            let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight / 2,
                A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(lazyImageBox);
            }
        });
    }
    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            imgUrl = img.getAttribute('data-img');
        tempImg = new Image;
        tempImg.src = imgUrl;
        tempImg.onload = function () {
            img.src = imgUrl;
            utils.css(img, 'opacity', 1);
        }
        img.removeAttribute('data-img');
        tempImg = null;
        lazyImageBox.setAttribute('isLoad', 'true');

    }
    let isReader;
    let loadMore = function loadMore() {
        let HTML = document.documentElement;
        if (isReader) return;
        isReader = true;
        if (HTML.clientHeight * 1.5 + HTML.scrollTop > HTML.scrollHeight) {
            queryData();
            bindHTML();
            lazyFun();
        }
        isReader = false;
    }
    return {
        init() {
            queryData();
            bindHTML();
            lazyFun();
            window.onscroll = function () {
                lazyFun();
                loadMore();
            }
        }
    }
})();
caseceFlowModule.init();