
export const changeProps = (host, props) => 
	Object.keys(props).forEach(k => host[k] = props[k])

const defaultOptions = {
	debug: false,
}

const getOptions = () => {
	const queryStr = "\\?(.*)?"
	const regex = ["localhost", "lvh.me"].includes(window.location.hostname) ? new RegExp(`${window.location.hostname}:3001/widget.js${queryStr}`) : new regex(`highlighthelper.com/widget.js${queryStr}`)
	for(let i = 0; i < document.scripts.length; i++) {
		const { src } = document.scripts.item(i)
		const match = src.match(regex)
		if(match) {
			let options = defaultOptions;
			const [, queryStrMatch ] = match;
			const newOpts = queryStrMatch.split("&").reduce((acc, param) => {
				const [ key, val ] = param.split("=");
				acc[key] = val;
				return acc;
			}, {})
			return { ...options, ...newOpts }
		}
	}
	return defaultOptions;
}

export const Options = getOptions();