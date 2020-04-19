let shopModole = (function () {
    //拿到想要操作的对象
    let $tabList = $('.sort_btn_box .sort_btn'),
        $cardList = null,
        _data = null;
    let queryData = function queryData() {
        $.ajax({
            url: './json/product.json',
            method: 'GEt',
            dataType: 'json',
            async: false,
            success: result => {
                _data = result;
                console.log(result);
            }
        });
    }
    //绑定数据
    let bindHTML = function bindHTML() {
        $(_data).each((index, item) => {
            let { title,
                price,
                hot,
                img,
                time } = item;
            $(`<li class="phone_box" data-time="${time}" data-hot="${hot}" data-price="${price}">
                    <div class="phone_img">
                        <img src="${img}" alt="">
                    </div>
                    <h2>${title}</h2>
                    <div class="phone_price">
                        <span>￥${price.toFixed(2)}</span>
                    </div>
                    <h2>销量:${hot}</h2>
                    <h2>时间:${time}</h2>
                </li>`).appendTo($('.phone_list_box'));
        });
        $cardList = $('.phone_box');
    }
    //按指定信息进行排序
    let sortCard = function sortCard() {
        let str = $(this).attr('data-sort');
        this.flag *= -1;
        // console.log(this.flag);
        $cardList.sort((a, b) => {
            a = $(a).attr(str);
            b = $(b).attr(str);
            if (str === 'data-time') {
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }
            return (a - b) * this.flag;
        });
        // console.log($cardList);
        $cardList.each((index, item) => {
            $(item).appendTo($('.phone_list_box'));
        });
    }
    //给选项绑定点击事件
    let handleTab = function handleTab() {
        $tabList.each(function(){
            this.flag = -1;
        });
        $tabList.on('click', function () {
            sortCard.call(this);
            $(this).siblings('.sort_btn').each(function(){
                this.flag = -1;
            });
        });
    }
    return {
        init() {
            queryData();
            bindHTML();
            handleTab();
        }
    }
})();
shopModole.init();