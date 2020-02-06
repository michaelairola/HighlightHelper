const convertVariable = v => 
	Array.isArray(v) ? v.join("") :
	v instanceof HtmlElement ? v.render() :
	v instanceof htmlObj ? 
		htmlObj.keys(v).map(key => v.MapFn(key, v[key])).join("") :
	typeof v == "object" && v.hasOwnProperty("map") ? 
		htmlObj.keys(v).map(key => v.MapFn(key, v[key])).join("") : v

export const html = (strings, ...keys) =>
	strings[0] + keys.map((key,i) => `${convertVariable(key)}${strings[i + 1]}`).join("");