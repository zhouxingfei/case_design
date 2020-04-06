let shopModle = (function () {
    let navList = document.querySelectorAll('.navList .btn'),
        productBox = document.querySelector('.productBox');
    data = null;
    console.log(navList);
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    }

    let clear = function clear(i) {
        [].forEach.call(navList, (item, index) => {
            if (i !== index) {
                item.flag = -1;
            }
        })
    }

    let renderHTML = function readerHTML() {
        let str = '';
        data.forEach(item => {
            let { id,
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `<li>
                <div><img src="${img}" alt=""></div>
                <h2>${title}</h2>
                <h2>￥${price.toFixed(2)}</h2>
                <h2>${time}</h2>
                <h2>热度：${hot}</h2>
            </li>`
        });
        productBox.innerHTML = str;
    }

    let handle = function handle() {
        
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick = function () {
                //debugger
                this.flag *= -1;
                clear(index);
                let pai = item.getAttribute('data-pai');
                console.log(pai);
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag;
                });
                renderHTML();
            }
        })
        
    }
    return {
        init() {
            queryData();
            renderHTML();
            handle();
        }
    }
})();
shopModle.init();