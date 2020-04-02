let showModle = (function () {
    let navList = document.querySelectorAll('.navbar-nav .nav-item');
    productBox = document.querySelector('.productBox');
    cardList = null;
    data = null;
    //从服务端查询数据
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

    //读取数据
    let readerHtml = function () {
        let str = '';

        data.forEach(item => {
            let { id,
                price,
                time,
                hot,
                img,
                title } = item;
            str += `<div class="card" data-price="${price}" data-time="${time}"
            data-hot="${hot}">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：￥${price.toFixed(2)}</p>
                <p class="card-text">销量：${hot}</p>
                <p class="card-text">时间：${time}</p>
            </div>
        </div>`;
        });
        productBox.innerHTML = str;
        cardList = document.querySelectorAll('.card');
    }
    
    let clear = function (i){
        [].forEach.call(navList,(item,index)=>{
            if(index !== i){
                item.flag = -1;
            }
        });
    }

    //排序
    let sortCard = function (i) {
        this.flag *= -1;
        console.log(i);
        let arr = Array.from(cardList);
        let char = 'data-price';
        i === 1 ? char = 'data-time' : null;
        i === 2 ? char = 'data-hot' : null;

        arr.sort((a, b) => {
            a = a.getAttribute(char);
            b = b.getAttribute(char);
            if (i === 1) {
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }
            return (a - b) * this.flag;
        });
        for (let j = 0; j < arr.length; j++) {
            productBox.appendChild(arr[j]);
        }
    }

    let hanldleNav = function () {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick = function () {
                //回复其他按钮的默认值
                clear.call(this.index);
                //排序
                sortCard.call(this, index);

            }
        })

    }
    return {
        init() {
            queryData();
            readerHtml();
            hanldleNav();
        }
    }
})();
showModle.init();