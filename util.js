
export function setCookie(name, value, days) {
	var d = new Date;
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

export function getCookie(name) {
	var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

export function delCookie(name) {
	setCookie(name, '', -1);
}

export function setSessionStorage(name, value) {
	sessionStorage.setItem(name, JSON.stringify(value))
}

export function getSessionStorage(name, type) {
	let v = JSON.parse(sessionStorage.getItem(name));
	let empty;
	switch (type) {
		case 'String':
			empty = '';
			break;
		default:
			empty = {}
			break;
	}
	return v ? v : empty;
}

export function delSessionStorage(name) {
	sessionStorage.removeItem(name)
}

export function setLocalStorage(name, value) {
	localStorage.setItem(name, JSON.stringify(value))
}

export function getLocalStorage(name, type) {
	let v = JSON.parse(localStorage.getItem(name));
	let empty;
	switch (type) {
		case 'String':
			empty = '';
			break;
		default:
			empty = {}
			break;
	}
	return v ? v : empty;
}

export function delLocalStorage(name) {
	localStorage.removeItem(name)
}