let caseFlow = (function () {
    //获取需要操作的元素
    let $columns = $('.column'),
        $lazyBoxs = null,
        isRuning = false,
        count = 1,
        _data = [];
    //数据查询
    let queryData = function queryData() {
        $.ajax({
            url: 'json/data.json',
            method: 'get',
            dataType: 'json',
            async: false,
            success: result => {
                _data = result;
            }
        });
    };
    //绑定数据
    let bindHTML = function bindHTML() {
        _data = _data.map(item => {
            let h = item.height,
                w = item.width;
            h = h / (w / 230);
            item.height = h;
            item.width = 230;
            return item;
        });

        for (let i = 0; i < _data.length; i += 5) {
            let ground = _data.slice(i, i + 5);
            if (i !== 0) {
                ground.sort((a, b) => {
                    return a.height - b.height;
                });
                $columns.sort((a, b) => {
                    return b.offsetHeight - a.offsetHeight;
                });
            }
            ground.forEach((item, index) => {
                let { pic,
                    title,
                    link,
                    height } = item;
                $(`<div class="card">
                        <a href="${link}">
                            <div class="lazyImageBox" style="height:${height}px"><img src="" alt="" data-img="${pic}"></div>
                            <p>${title}</p>
                        </a>
                    </div>`).appendTo($columns.eq(index));
            });
        }
    }

    let lazyFun = function lazyFun(){
        $lazyBoxs = $('.lazyImageBox').filter((index,item)=>{
            return $(item).find('img').attr('data-img');
        });
        // 遍历集合中的每一项，给每一项做图片的延迟加载
        $lazyBoxs.each((index,item)=>{
            let $window = $(window),
                $item = $(item);
            //求出视口高度A和
            //outerHeight()求出对象本身的高度，包含paddding和border
            let A = $window.outerHeight() + $window
            .scrollTop(),
                B = $item.outerHeight() /2 + $item.offset().top;
            if(B <= A){
                //开始单张图片的延迟加载
                let $img = $item.find('img'),
                    dataImage = $img.attr('data-img'),
                    tempImage = new Image;
                tempImage.src = dataImage;
                tempImage.onload = function(){
                    $img.attr('src',dataImage).css({
                        opacity : 1
                    });
                };
                tempImage = null;
                //移除data-img属性
                $img.removeAttr('data-img');
            }
        });
    }

    let loadMore = function loadMore(){
        //页面的真实高度，
        let $window = $(window),
            winH = $window.outerHeight(),
            scrollT = $window.scrollTop(),
            scrollH = $('body').outerHeight();
        if(winH + scrollT + winH /2 >= scrollH){
            if(isRuning) return;
            isRuning = true;
            count++;
            if(count > 5){
                isRuning = false;
                return;
            }
            queryData();
            bindHTML();
            lazyFun();
            isRuning = false;
        }
    };
    return {
        init() {
            queryData();
            bindHTML();
            lazyFun();
            window.onscroll = function(){
                lazyFun();
                loadMore();
            }
        }
    }
})();
caseFlow.init();