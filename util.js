const EMPTY_VALUE = (fn) => {
	const _VALUES = {
		String: '',
		Number: 0,
		Array: [],
		Object: {},
		Boolean: false
	}
	const match = fn && fn.toString().match(/^\s*function (\w+)/)
	return match ? _VALUES[match[1]] : null
}
const LocaStor = {
	set (name, value) {
		const v = value ? JSON.stringify(value) : ''
		localStorage.setItem(name, v)
	},
	get (name, type = Object) {
		const v = localStorage.getItem(name)
		return v ? JSON.parse(v) : EMPTY_VALUE(type)
	},
	del (name) {
		localStorage.removeItem(name)
	}
}
const Session = {
	set (name, value) {
		const v = value ? JSON.stringify(value) : ''
		sessionStorage.setItem(name, v)
	},
	get (name, type = Object) {
		const v = sessionStorage.getItem(name)
		return v ? JSON.parse(v) : EMPTY_VALUE(type)
	},
	del (name) {
		sessionStorage.removeItem(name)
	}
}
const Cookie = {
	set (name, value, days) {
		var d = new Date()
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
		window.document.cookie = `${name}=${value}path=/;expires=${d.toGMTString()}`
	},
	get (name) {
		var v = window.document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
		return v ? v[2] : null
	},
	del (name) {
		this.set(name, '', -1)
	}
}
Object.freeze(LocaStor)
Object.freeze(Session)
Object.freeze(Cookie)

export { LocaStor, Session, Cookie }

export const browser = {
	uc () { return navigator.userAgent.includes("UCBrowser") },
	wx () { return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" }
}

const _mobileSystem = () => {
	const _isMob = () => {
		return /(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i.test(navigator.userAgent)
	}
	return {
		ios () { return _isMob() && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) },
		adro () { return _isMob() && /(android|Adr)/i.test(navigator.userAgent) }
	}
}
export const mobileSystem = _mobileSystem()

export function mapUrl (url) {
	_typeCheck(url, "string", "mapUrl")
	if (!url.includes("?")) {
		return { url, query: {} }
	}
	let { 0: path, 1: params } = url.split("?");
	let arr = params.split("&");
	let query = arr.reduce((obj, item) => {
		let { 0: key, 1: val } = item.split("=");
		obj[key] = val;
		return obj;
	}, {});
	return { url: path, query }
}

export const mapQuery = (data) => {
	_typeCheck(data, "object", "mapQuery")
	let str = "";
	Object.keys(data).forEach(key => {
		str += `${key}=${data[key]}&`;
	});
	return str.slice(0, -1);
}

function _typeCheck (params, expect, name) {
	if (!params) {
		throw new Error(`the params of ${name} is undefined!`);
	}
	if (typeof params != expect) {
		throw new Error(`params typeof is ${typeof params} the params of "${name}" must be a ${expect}!`);
	}
}

export function randomNums (len, dict, str = "") {
	for (var i = 0, rs = ""; i < len; i++)
		rs += dict.charAt(Math.floor(Math.random() * 100000000) % dict.length);
	return rs += str;
}

export function randomPhone () {
	return [1, randomNums(2, "3458"), "****", randomNums(4, "0123456789")].join("");
}

export function createUniqueString () {
	const timestamp = +new Date() + ''
	const randomNum = parseInt((1 + Math.random()) * 65536) + ''
	return (+(randomNum + timestamp)).toString(32)
}