let showModle = (function () {
    let navList = document.querySelectorAll('.sort_btn_box .sort_btn'),
        productBox = document.querySelector('.phone_list_box'),
        cardList = null,
        data = null;

    let queryData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    }

    let readerHTML = function () {
        let str = '';
        data.forEach(item => {
            let { id,
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += ` <li class="phone_box" data-time="${time}" data-price="${price}" data-hot="${hot}">
                        <div class="phone_img">
                            <img src="${img}" alt="">
                        </div>
                        <h2>${title}</h2>
                        <div class="phone_price">
                            <span>￥${price}</span>
                        </div>
                        <h2>时间${time}</h2>
                        <h2>销量${hot}</h2>
                    </li>`;
        });
        productBox.innerHTML = str;
        cardList = document.querySelectorAll('.phone_box');
    }

    let clear = function (i) {
        [].forEach.call(navList, (item, index) => {
            if (i !== index) {
                item.flag = -1;
            }
        })

    }

    let sortCard = function (i) {
        console.log(this.flag);
        let arr = Array.from(cardList);
        let char = 'data-price';
        i === 1 ? char = 'data-time' : null;
        i === 2 ? char = 'data-hot' : null;
        arr.sort((a, b) => {
            console.log(char);
            a = a.getAttribute(char);
            b = b.getAttribute(char);
            console.log(a,b)
            if (i === 1) {
                console.log(a,b)
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }
            return (a - b) * this.flag;
        });
        for (let j = 0; j < arr.length; j++) {
            productBox.appendChild(arr[j]);
        }
    }

    let handleNav = function () {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick = function () {
                item.flag *= -1;
                clear(index);
                sortCard.call(this, index);
            }
        })
    }
    return {
        init() {
            queryData();
            readerHTML();
            handleNav();
        }
    }
})();
showModle.init();