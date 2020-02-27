
export const changeProps = (host, props) => 
	Object.keys(props).forEach(k => host[k] = props[k])
