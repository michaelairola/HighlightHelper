import { html } from "hybrids";
import { mainPage } from "./main.js";
import { emailPage } from "./email.js";
import { Style, ToggleTrans } from "../factories.js";

const HelperStyles = {
	position: "absolute",
	overflow: "hidden",
	border: "solid 2px grey",
	borderRadius: "5px",
	background: "#bbb",
}
const hideStyles = {
	top: 0, 
	left: 0,
	width: 0,
	height: 0,
	opacity: 0,
}
const showStyles = ({ left, top }) => ({
	top, left,
	width: 200,
	height: 100,
	opacity: 1,
})
const PageWrapperStyle = {
	position: "relative",
	width: "200%",
	right: 0,
}
const PageWrapperOffsett = (page) => ({ right: `${page * 100}%` })
const PageStyle = {
	width: "50%",
	float: "left",
}

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

export const HighlightHelper = {
	Style, ToggleTrans,
	show: {
		set: ({ Style, ToggleTrans }, show) => {
			ToggleTrans(":host", "opacity .5s linear")
			Style(":host", showStyles(show));
			ToggleTrans("#PageWrapper", "right .3s linear")
			Style("#PageWrapper", PageWrapperStyle);
			Style("[id|=Page]", PageStyle);
		},
		connect: ({ Style }) => Style(":host",{ ...HelperStyles, ...hideStyles })
	},
	hide: {
		get: (host) => () => {
			host.ToggleTrans("#PageWrapper", "right")
			host.Style(":host", hideStyles);
			host.page = 0;
		} 
	},
	page: {
		set: ({ Style }, page) => Style("#PageWrapper", PageWrapperOffsett(page))
	},
	render: (host) => html`
	<div id="PageWrapper">
		${[mainPage, emailPage].map(((fn,i) => html`
			<div id="Page-${i}">${fn(host)}</div>
		`))}
	</div>
	`
}
