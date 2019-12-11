
export class htmlObj extends Object {
	constructor(obj) {
		super();
		Object.keys(obj).forEach(key => {
			this[key] = obj[key];
		})
	}
	static keys = htmlObj => Object.keys(htmlObj).filter(key => key != "map")
	map = fn => htmlObj.keys(this).map(key => fn(key, this[key]))
}

const convertVariable = v => {
	if (Array.isArray(v)) {
		return v.join("");
	} else if (typeof v == "object" && v.hasOwnProperty("map")) {
		return htmlObj.keys(v).map(key => v.MapFn(key, v[key])).join("")
	} else if (typeof v == "function") {
		return v()
	}
	return v
}

export const html = (strings, ...keys) => {
	return strings[0] + keys.map((key,i) => `${convertVariable(key)}${strings[i + 1]}`).join("");
}

export const renderById = template => {
	const id = template.name;
	document.getElementById(id).innerHTML = template()
}

export const listenToMouseOver = (className, addedClassName) => {
	document.querySelectorAll(`.${className}`).forEach(node => {
		node.addEventListener('mouseover', _ => {
			node.classList.add(addedClassName);
		})
		node.addEventListener('mouseout', (e) => {
			node.classList.remove(addedClassName);
		});
	})
}



