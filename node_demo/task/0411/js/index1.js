let caseceFlowModule = (function () {
    //获得我们需要操作的对象
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = null;
    // console.log(columns);
    //数据获取
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
    //绑定数据
    let bindHTML = function bindHTML() {
        //因为我们的图片大小不确定，我们在页面的图片盒子固定为230px,从数据库拿到的数据进行处理，以适应前端页面的宽度
        _data.map(item => {
            let h = item.height,
                w = item.width;
            h = h / w * 230;
            item.width = 230;
            item.height = h;
            return item;
        });
        console.log(_data);
        //按照5个为一组进行循环
        for (let i = 0; i < _data.length; i += 5) {
            //对我们的处理好的图片的高度升序排列
            let ground = _data.slice(i, i + 5);
            ground.sort((a, b) => {
                return a.height - b.height;
            });
            //对我们的五个列进行排序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            //循环5个数据总的每一项，每循环一个数据，创建一个CARD，将CARD添加的到对应的列中
            ground.forEach((item, index) => {
                let { pic,
                    title,
                    link,
                    height } = item;
                //创建一个CARD  不清楚height的值加到哪里？
                let card = document.createElement('div');
                card.className = 'card';
                let str = `<a href="${link}">
                    <div class="lazyImageBox" style="height:${height}px">
                        <img src="" alt="" data-img="${pic}">
                    </div>
                    <p>${title}</p>
                </a>`;
                card.innerHTML = str;
                columns[index].appendChild(card);
            });

        }

    }
    let lazyFunc = function lazyFunc() {
        //处理所有需要延迟加载的lazyImageBox 
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs, item => {
            //获取处理过的标记，判断处理过的盒子就不需要在处理了
            let isReader = item.getAttribute('isReader');
            if (isReader == 'true') return;
            //获取lazyImageBox一半的位置距离BODY顶端的距离
            //获取浏览器底边距离BODY顶端的距离
            let B = utils.offset(item).top + item.offsetHeight / 2;
            let A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            // console.log(utils.offset(lazyImageBox).top,lazyImageBox.offsetHeight / 2);
            if (B <= A) {
                lazyImage(item);
            }
            //延迟加载的条件
        });

    }

    let lazyImage = function lazyImage(item) {
        // debugger
        //获得到单个懒加载图片
        //获得到data-img自定义属性，检验其src地址是否能正常加载
        // console.log(lazyImageBox);
        let img = item.querySelector('img'),
            imgUrl = img.getAttribute('data-img'),
            newImg = new Image;
        newImg.src = imgUrl;
        newImg.onload = function () {
            img.src = imgUrl;
            utils.css(img, 'opacity', 1);
        }
        img.removeAttribute('data-img');
        newImg = null;
        item.setAttribute('isReader', 'true');
    };

    //定义一个状态，当这次状态正在没有加载完成时，阻断下一次加载
    let isReader;
    let loadMoreData = function loadMoreData(){
        let HTML = document.documentElement;
        if(isReader) return;
        isReader = true;
        if(HTML.clientHeight * 1.5 + HTML.scrollTop > HTML.scrollHeight ){
            queryData();
            bindHTML();
            lazyFunc();
        }
        isReader = false;
    }
    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                // 现有图片的延迟加载
                lazyFunc();
                // 加载更多数据
                loadMoreData();
            };
        }
    }
})();
caseceFlowModule.init();