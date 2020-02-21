
const connectStyle = (host, v) => Object.keys(v).forEach(k => host.style[k] = v[k])
const toggleTransition = (host, v) => {
	const t = v.split(" ")[0];
	let transition;
	if(!host["transition"]) {
		transition = v;
	} else {
		const oldTrans = host["transition"].split(",");
		const index = oldTrans.findIndex(tran => tran.includes(t))
		if(index + 1) {
			transition = oldTrans.filter((_,i) => index != i);
		} else {
			transition = [ ...oldTrans, v ].join(",");
		}
	}
	return connectStyle(host, { transition })
} 
export const Style = { get: host => (key, v) => key == ":host" ? connectStyle(host, v) : host.render().querySelectorAll(key).forEach(h => connectStyle(h, v))};
export const ToggleTrans = { get: host => (key, v) => key == ":host" ? toggleTransition(host, v) : host.render().querySelectorAll(key).forEach(h => toggleTransition(h, v))};
