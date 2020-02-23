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
	connectStyle(host, { transition, WebkitTransition: transition })
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
	connectStyle(host, { transition, WebkitTransition: transition })	
}

const hostWrapper = fn => (host, key, v) => key == ":host" ? fn(host, v) : host.render().querySelectorAll(key).forEach(h => fn(h,v))
const Style = hostWrapper(connectStyle);
const AddTransition = hostWrapper(addTransition);
const RemoveTransition = hostWrapper(removeTransition);

export const styleProperty = (selector, key, init ) => ({
	set: (host, val) => {
		if (typeof val == "object") {
			const { value, transition } = val;
			if(transition) AddTransition(host, selector, [ key, transition ].join(" "))
			else RemoveTransition(host, selector, key)
			if(value) Style(host, selector, { [key]: val.value });
			return value;
		} else {
			RemoveTransition(host, selector, key)
			Style(host, selector, { [key]: val })
			return val
		}
	},
	connect: host => {
		host[key] = init
		Style(host, selector, { [key]: init })
	},
})

export const initialize = (styles) => ({
	connect: host => {
		Object.keys(styles).forEach(k => Style(host, k, styles[k]))
	},
})
export const getter = x => ({ get: x });
export const method = getter;
export const changeProps = (host, props, transition) => Object.keys(props).forEach(k => host[k] = transition ? { value: props[k], transition } : props[k])
