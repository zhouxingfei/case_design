let utils = (function () {
    function getCss(element, attr) {
        let value = window.getComputedStyle(element)[attr],
            reg = /^(rem|em|px)$/;
        if (reg.test(attr)) {
            value = parseFloat(value);
        }
        return value;
    }
    function setCss(element, attr, value) {
        if (attr == 'opacity') {
            element.style[attr] = value;
            element.style['fitle'] = `alpha(opacity="${value * 100}")`;
        }
        let reg = /(width|height|margin|padding)?(top|bottom|right|left)?/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += 'px';
            }
            element.style[attr] = value;
        }
    }
    function setGroupCss(element, option) {
        for (let key in option) {
            if (!option.hasOwnproperty(key)) break;
            setCss(element, key, option[key]);
        }
    }

    function css(element) {
        let len = arguments.length,
            attr = arguments[1],
            value = arguments[2];
        if (len >= 3) {
            setCss(element, attr, value);
            return;
        }
        if (attr !== null && typeof attr === "object") {
            setGroupCss(element, attr);
            return;
        }
        return getCss(element, attr);
    }

    function offset(element) {
        let parent = element.offsetParent,
            top = element.offsetTop,
            left = element.offsetLeft;
        while (parent) {
            if (!/MSIE 8/.test(navigator.userAgent)) {
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
    return{
        offset,
        css
    }
})();