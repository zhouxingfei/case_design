/*
 * UTILS中集合了我们以后项目中经常会使用的方法 
 */
let utils = (function () {

	function getCss(element, attr) {
		let value = window.getComputedStyle(element)[attr],
			reg = /^(px|rem|em)$/;
		if (reg.test(attr)) {
			value = parseFloat(value);
		}
		return value;
	}

	function setCss(element, attr, value) {
		if (attr == 'opacity') {
			element.style['opacity'] = value;
			element.style['fitle'] = `alpha(opacity = ${value * 100})`;
		}
		let reg = /(width|height|margin|padding)?(top|bottom|right|left)?/;
		if(reg.test(attr)){
			if(!isNaN(value)){
				value += 'px';
			}
		element.style[attr] = value;
		}
	}
	function setGroupCss(element,option){
		for(let key in option){
			if(!option.hasOwnproperty(key)) break;
			setCss(element,key,option[key]);
		}
	}

	function css(element) {
		let len = arguments.length,
			attr = arguments[1],
			value = arguments[2];
		if (len >= 3) {
			// 单一设置样式
			setCss(element, attr, value);
			return;
		}
		if (attr !== null && typeof attr === "object") {
			// 批量设置
			setGroupCss(element, attr);
			return;
		}
		// 获取样式
		return getCss(element, attr);
	}

	function offset(element) {
		let parent = element.offsetParent,
			top = element.offsetTop,
			left = element.offsetLeft;
		while(parent){
			if(!/MSIE 8/.test(navigator.userAgent)){
				top += parent.clientTop;
				left += parent.clientLeft;
			}
			top += parent.offsetTop;
			left += parent.offsetLeft;
			parent = parent.offsetParent;
		}
		return {
			top,
			left
		};
	}

	// function offset(element) {
	// 	let parent = element.offsetParent,
	// 		top = element.offsetTop,
	// 		left = element.offsetLeft;
	// 	while (parent) {
	// 		if (!/MSIE 8/.test(navigator.userAgent)) {
	// 			left += parent.clientLeft;
	// 			top += parent.clientTop;
	// 		}
	// 		left += parent.offsetLeft;
	// 		top += parent.offsetTop;
	// 		parent = parent.offsetParent;
	// 	}
	// 	return {
	// 		top,
	// 		left
	// 	};
	// }

	// window['_css'] = css;
	// window['_offset'] = offset;

	return {
		css,
		offset
	};
})();