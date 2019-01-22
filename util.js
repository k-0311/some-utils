export function setCookie(name, value, days) {
	var d = new Date;
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	window.document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`
}

export function getCookie(name) {
	var v = window.document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
	return v ? v[2] : null;
}

export function delCookie(name) {
	setCookie(name, "", -1);
}

export function setSessionStorage(name, value) {
	let v = value ? JSON.stringify(value) : "";
	sessionStorage.setItem(name, v)
}

export function getSessionStorage(name, type = "Object") {
	let types = {
		String: "",
		Array: [],
		Object: {}
	}
	let v = sessionStorage.getItem(name);
	let empty = types[type];
	return v ? JSON.parse(v) : empty;
}

export function delSessionStorage(name) {
	sessionStorage.removeItem(name)
}

export function setLocalStorage(name, value) {
	let v = value ? JSON.stringify(value) : "";
	localStorage.setItem(name, v)
}

export function getLocalStorage(name, type = "Object") {
	let types = {
		String: "",
		Array: [],
		Object: {}
	}
	let v = localStorage.getItem(name);
	let empty = types[type];
	return v ? JSON.parse(v) : empty;
}

export function delLocalStorage(name) {
	localStorage.removeItem(name)
}

export function mapUrl(url) {
	_typeCheck(url, "string", "mapUrl");
	if (!url.includes("?")) {
		return { url, query: {} };
	}
	let { 0: path, 1: params } = url.split("?");
	let arr = params.split("&");
	let query = arr.reduce((obj, item) => {
		let { 0: key, 1: val } = item.split("=");
		obj[key] = val;
		return obj;
	}, {});
	return { url: path, query };
}

export const mapQuery = (data) => {
	_typeCheck(data, "object", "mapQuery");
	let str = "";
	Object.keys(data).forEach(key => {
		str += `${key}=${data[key]}&`;
	});
	return str.slice(0, -1);
}

function _typeCheck(params, expect, name) {
	if (!params) {
		throw new Error(`the params of ${name} is undefined!`);
	}
	if (typeof params != expect) {
		throw new Error(`params typeof is ${typeof params}; the params of "${name}" must be a ${expect}!`);
	}
}

export function imgWatch(scroll, imgs, init = true) {
	let arr = init ? Array.from(document.getElementsByTagName("img")) : imgs;
	setTimeout(() => {
		let srpimg = arr.filter(item => !item.complete);
		scroll.refresh();
		if (srpimg.length > 0) imgWatch(scroll, srpimg, false);
	}, 200);
}