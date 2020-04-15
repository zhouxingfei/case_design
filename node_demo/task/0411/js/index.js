let caseceFlowModule = (function () {
    //获得我们需要操作的对象
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = [];
        // console.log(columns);
    //数据获取
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    }
    //绑定数据
    let bandHTML = function bandHTML() {
        //因为我们的图片大小不确定，我们在页面的图片盒子固定为230px,从数据库拿到的数据进行处理，以适应前端页面的宽度
        _data = _data.map(item => {
            let w = item.width,
                h = item.height;
            h = h / (w / 230);
            item.width = 230;
            item.height = h;
            return item;
        });
        //按照5个为一组进行循环
        for (let i = 0; i < _data.length; i += 5) {
            let ground = _data.slice(i, i + 5);
            // if(ground === undefined) return ;
            //对我们的处理好的图片的高度升序排列
            ground.sort((a, b) => {
                return a.height - b.height;
            });
            //对我们的五个列进行排序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            //循环5个数据总的每一项，每循环一个数据，创建一个CARD，将CARD添加的到对应的列中
            ground.forEach((item, index) => {
                let { 
                    pic,
                    link,
                    title,
                    height } = item;
                //创建一个CARD
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<a href="${link}">
                    <div class="lazyImageBox" style="height:${height}px">
                        <img src="" alt="" data-image="${pic}">
                    </div>
                    <p>${title}</p>
                 </a>`;
                //  console.log(columns[index]);
                 columns[index].appendChild(card);
            });
        }
    };

    let lazyFunc = function lazyFunc(){
        //处理所有需要延迟加载的lazyImageBox 
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs,lazyImageBox=>{
            //处理过的盒子就不需要在处理了
            let isLoad = lazyImageBox.getAttribute('isLoad');
            if(isLoad === "true") return;
            //获取lazyImageBox一半的位置距离BODY顶端的距离
            //获取浏览器底边距离BODY顶端的距离
            let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight / 2;
            // console.log(utils.offset(lazyImageBox).top,lazyImageBox.offsetHeight / 2);
            let A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            //延迟加载的条件
            if(B <= A){
                lazyImg(lazyImageBox);
            }
        });
    };

    let lazyImg = function lazyImg(lazyImageBox){
        //获得到单个懒加载图片
        //获得到data-img自定义属性，检验其src地址是否能正常加载
        // console.log(lazyImageBox);
        let img = lazyImageBox.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
            console.log(dataImage);
        tempImage.src = dataImage;
        tempImage.onload = ()=>{
            console.log('111');
            img.src = dataImage;
            utils.css(img,'opacity',1);
        }
        img.removeAttribute('data-image');
        tempImage = null;
        lazyImageBox.setAttribute('isLoad','true');
    };
    //定义一个状态，当这次状态正在没有加载完成时，阻断下一次加载
    let isRender;
    let loadMoreData = function loadMoreData(){
        let HTML = document.documentElement;
        if(HTML.clientHeight + HTML.scrollTop + HTML.clientHeight /2 >= HTML.scrollHeight){
            if(isRender) return;
            isRender = true;
            queryData();
            bandHTML();
            lazyFunc();
            isRender = false;
        }

    }
    return {
        init() {
            queryData();
            bandHTML();
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