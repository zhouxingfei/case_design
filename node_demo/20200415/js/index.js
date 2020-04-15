let caseFlow = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = null;

    let queryDate = function queryDate() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                _data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    }

    let bindHTML = function bindHTML() {
        _data.map(item => {
            let h = item.height,
                w = item.width;
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
                    link,
                    height } = item;
                let card = document.createElement('div');
                card.className = 'card';
                let str = `<a href="${link}">
                            <div class="lazyImageBox" style="height:${height}px"><img src="." alt="" data-img="${pic}"></div>
                            <p>${title}</p>
                        </a>`;
                card.innerHTML = str;
                columns[index].appendChild(card);
            });
        }
    }

    let lazyFun = function lazyFun() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            let isLoad = lazyImageBox.getAttribute('isLoad');
            if (isLoad == 'true') return;
            let B = utils.offset(lazyImageBox).top + lazyImageBox.clientHeight / 2,
                A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(lazyImageBox);
            }
        });
    }
    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            tempImg = new Image,
            imgUrl = img.getAttribute('data-img');
        tempImg.src = imgUrl;
        tempImg.onload = function () {
            img.src = imgUrl;
            utils.css(img, 'opacity', 1);
        }
        tempImg = null;
        img.removeAttribute('data-img');
        lazyImageBox.setAttribute('isLoad', 'true');
    }
    let isReader;
    let loadMore = function loadMore(){
        let HTML = document.documentElement;
        if(isReader) return;
        if(HTML.clientHeight * 1.5 + HTML.scrollTop > HTML.scrollHeight){
            queryDate();
            bindHTML();
            lazyFun();
        }
        isReader = false;
    }
    return {
    init() {
        queryDate();
        bindHTML();
        lazyFun();
        window.onscroll = function(){
            lazyFun();
            loadMore();
        }
    }
}
}) ();
caseFlow.init();