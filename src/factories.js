
const connectStyle = (host, v) => Object.keys(v).forEach(k => host.style[k] = v[k])

const getType = v => v.split(" ")[0];
const addTransition = (host, v) => {
	const t = getType(v)
	let transition = host.style["transition"]
	if(transition) {
		let tranArr = transition.split(",")
		let index = tranArr.findIndex(tran => t == getType(tran))
		if(index + 1) {
			tranArr = tranArr.map((tran,i) => index == i ? v : tran)
		} else {
			tranArr = [ ...tranArr, v ];
		}
		transition = tranArr.join(", ")
	} else {
		transition = v
	}
	connectStyle(host, { transition })
}
const removeTransition = (host, v) => {
	if(v == "*") {
		connectStyle(host, { transition: "" });
		return;
	}
	const t = getType(v)
	let transition = host.style["transition"];
	if(!transition) return
	transition = transition.split(", ").filter(tran => getType(tran) != t)
	connectStyle(host, { transition })	
}

export const styleProperty = (selector, key) => ({
	set: (host, val) => {
		host.Style(selector, { [key]: val })
		return val
	}
})


const hostWrapper = fn => ({ get: host => (key, v) => key == ":host" ? fn(host, v) : host.render().querySelectorAll(key).forEach(h => fn(h,v))})
export const Style = hostWrapper(connectStyle);
export const AddTransition = hostWrapper(addTransition);
export const RemoveTransition = hostWrapper(removeTransition);