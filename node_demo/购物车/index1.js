//拿到list对象
var list = document.getElementById('list').getElementsByTagName('li');
var list1 = document.getElementById('info').getElementsByTagName('em');
let commodityMax = [];
//总计函数
function commodity () {
    var res = [];
    var nums = 0;
    var numsPrice =0;
    for(var j = 0;j < list.length;j++){
        var priceNum = list[j].getElementsByTagName('strong')[1];
        nums += Number(list[j].getElementsByTagName('em')[0].innerHTML);
        numsPrice += parseFloat(priceNum.innerHTML.substring(0,priceNum.innerHTML.length - 1));
    }
    res.push(nums);
    res.push(numsPrice)
    return res;
}
for(let i = 0;i < list.length;i++){
    ~ function(i){
             //拿到触发点击事件的
            var oper =  list[i].getElementsByTagName('i');
            //拿到商品的数量
            var num = list[i].getElementsByTagName('em')[0];
            //拿到商品的单价
            var price = list[i].getElementsByTagName('strong')[0];
            //拿到单个商品的总价
            var priceNum = list[i].getElementsByTagName('strong')[1];
            //对减数量进行函数绑定
            oper[0].onclick = function(){
                var price1 = parseFloat(price.innerHTML.substring(0,price.innerHTML.length - 2));
                num.innerHTML = Number(num.innerHTML) - 1 > 0 ? Number(num.innerHTML) - 1 : 0;
                if(Number(num.innerHTML) === 0){
                   var index = commodityMax.indexOf(price1.toString());//大坑   参数为string类型的
                   if(index != -1) commodityMax.splice(index,1);
                }
                commodityMax.sort((a,b) => b-a);
                priceNum.innerHTML = parseFloat(price1 * num.innerHTML) + "元";
                list1[0].innerHTML = commodity()[0];
                list1[1].innerHTML = commodity()[1];
                list1[2].innerHTML = commodityMax[0] === undefined ? 0 : commodityMax[0];
            }
            //对加数量进行函数绑定
            oper[1].onclick = function(){
                    var price1 = price.innerHTML.substring(0,price.innerHTML.length - 2);
                    num.innerHTML = Number(num.innerHTML) + 1;
                    if(Number(num.innerHTML) != 0  && Number(num.innerHTML) < 2){
                    commodityMax.push(price1);
                    }
                    commodityMax.sort((a,b) => b-a);
                    priceNum.innerHTML = parseFloat(price1 * num.innerHTML) + "元";
                    list1[0].innerHTML = commodity()[0];
                    list1[1].innerHTML = commodity()[1];
                    list1[2].innerHTML = commodityMax[0] === undefined ? 0 : commodityMax[0];
            }
    }(i);
   
}
