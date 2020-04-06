let shopModule = (function () {
	// 获取需要操作的元素
	let box = document.querySelector('.box');

	// 构建数据模型
	let data = [{
		id: 1,
		count: 0,
		price: 12.5
	}, {
		id: 2,
		count: 0,
		price: 10.5
	}, {
		id: 3,
		count: 0,
		price: 8.5
	}, {
		id: 4,
		count: 0,
		price: 8
	}, {
		id: 5,
		count: 0,
		price: 14.5
	}];

	// 渲染数据
	let render = function render() {
		//总信息
		let counts = 0,
			total = 0,
			priceArr = [0];
		//数据绑定
		let str = `<ul class="list">`;
		data.forEach(item => {
			let {
				id,
				count,
				price,
			} = item;
			//循环数组中的每一项，计算总购买数量和总价格以及把所有单价（已经购买的商品单价）存到数组总
			counts += count;
			total += count * price;
			count > 0 ? priceArr.push(price) : null;
			//count <1 ? priceArr.pop()
			str += `<li>
				<i data-btn='minus' data-id='${id}'></i>
				<em>${count}</em>
				<i data-btn='plus' data-id='${id}'></i>
				<span>
					单价：<strong>${price}元 </strong> 小计：<strong>${count * price}元</strong>
				</span>
			</li>`;
		});
		str += `</ul>`;
		str += `<div class="info">
			<span>商品公合计：<em>${counts}</em>件</span>
			<span>共花费了：<em>${total}</em>元</span>
			<br />
			<br />
			<span>其中最贵的商品单价是：<em>${Math.max(...priceArr)}</em>元</span>
		</div>`;
		box.innerHTML = str;
		//每一次页面按照数据重新渲染完，都获取所有的+/-标签绑定点击事件
		handle();
	};

	//事件绑定
	let handle = function handle() {
		let btns = Array.from(box.querySelectorAll('i'));
		btns.forEach(item => {
			item.onclick = function () {
				let btn = this.getAttribute('data-btn'),
					id = this.getAttribute('data-id');
				id = parseInt(id);
				data.map(cur => {
					if (cur.id === id) {
						if (btn === 'minus') {
							cur.count--;
							cur.count < 0 ? cur.count = 0 : null;
						} else {
							cur.count++;
						}
					}
					return cur;
				});
				render();
			};
		});
	};

	return {
		init() {
			render();
		}
	};
})();
shopModule.init();