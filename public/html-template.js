const convertVariable = v => 
	Array.isArray(v) ? 
		v.join("") :
	v instanceof htmlObj ? 
		htmlObj.keys(v).map(key => v.MapFn(key, v[key])).join("") :
	typeof v == "object" && v.hasOwnProperty("map") ? 
		htmlObj.keys(v).map(key => v.MapFn(key, v[key])).join("") :
	typeof v == "function" ? v() : v

export const html = (strings, ...keys) =>
	strings[0] + keys.map((key,i) => `${convertVariable(key)}${strings[i + 1]}`).join("");

export class htmlObj extends Object {
	constructor(obj) {
		super();
		Object.keys(obj).forEach(key => {
			this[key] = obj[key];
		})
	}
	keys(htmlObj) { return Object.keys(htmlObj).filter(key => key != "map") }
	map(fn){ return htmlObj.keys(this).map(key => fn(key, this[key])) }
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


