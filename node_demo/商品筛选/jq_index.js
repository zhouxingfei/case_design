let shopSerch = (function () {
    //获取要操作的对象
    let $choose = $('#choose'),
        $type = $('#type'),
        _data = null;
    //构建数据模型
    let chooseData = [{
        id: 1,
        name: '华为'
    }];
    let typeData = [{
        id: 1,
        name: '品牌',
        content: ['苹果', '华为', '小米', '锤子', '魅族', '三星', 'OPPO']
    }, {
        id: 2,
        name: '尺寸',
        content: ["3.0英寸以下", "3.0-3.9英寸", "4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
    }, {
        id: 3,
        name: '系统',
        content: ["安卓 ( Android )", "苹果 ( IOS )", "微软 ( WindowsPhone )", "其他"]
    }, {
        id: 4,
        name: '网络',
        content: ["联通3G", "双卡单4G", "双卡双4G", "联通4G", "电信4G", "移动4G"]
    }];
    //渲染页面
    let bindHTML = function bindHTML() {
        $(`<span>你的选择:</span>
        <mark data-id="${chooseData[0].id}">
            ${chooseData[0].name}
            <a href="javascript:;">x</a>
        </mark>`).appendTo($choose);

        $(typeData).each((index, item) => {
            let { id,
                name,
                content } = item;
            let str = `<li>
           ${name}：`;

            $(content).each((index, item) => {
                str += `<a href="javascript:;" data-id="${id}">${item}</a>`;
            });
            str += '</li>'
            $(str).appendTo($type);
        });
    }
    //为每一个标签点击事件
    let bindTypeClick = function bindClick() {
        $('#type a').on('click', function () {
            let $makes = $('#choose mark'),
                id = $(this).attr('data-id'),
                flag = false;

            $makes.each((index, item) => {
                if ($(item).attr('data-id') === id) {
                    $(item).html($(this).html() + '<a href="javascript:;">x</a>');
                    flag = true;
                    bindChooseClick();
                    return;
                }
            });
            if (flag) return;
            $(`<mark data-id="${id}">
            ${$(this).html()}
            <a href="javascript:;">x</a>
            </mark>`).appendTo($choose);
            $('#choose mark').sort((a, b) => {
                return $(a).attr('data-id') - $(b).attr('data-id');
            }).appendTo($choose);
            bindChooseClick();
        });
    }

    let bindChooseClick = function bindChooseClick(){
        $('#choose a').on('click', function () {
            let id = $(this).parent().attr('data-id'),
                $makes = $('#choose mark');
            $makes.filter((index,item)=>$(item).attr('data-id') == id).remove();
            // console.log($makes);
            // $makes.appendTo($choose);
        });

    }
    return {
        init() {
            bindHTML();
            bindTypeClick();
            bindChooseClick();
        }
    }
})();
shopSerch.init();