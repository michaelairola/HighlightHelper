import { html } from "hybrids";
import { mainPage } from "./main.js";
import { emailPage } from "./email.js";
import { Style, AddTransition, RemoveTransition } from "../factories.js";

const HelperStyles = {
	position: "absolute",
	overflow: "hidden",
	border: "solid 2px grey",
	borderRadius: "5px",
	background: "#bbb",
}
const hideStyles = {
	top: 0, left: 0, width: 0, height: 0, opacity: 0,
}
const showStyles = ({ left, top }) => ({
	top, left, opacity: 1,
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

export const HighlightHelper = {
	Style, AddTransition, RemoveTransition,
	show: {
		set: ({ Style, AddTransition }, show) => {
			AddTransition(":host", "opacity .5s linear")
			AddTransition("#PageWrapper", "right .3s linear")
			Style(":host", showStyles(show));
			Style("#PageWrapper", PageWrapperStyle);
			Style("[id|=Page]", PageStyle);
		},
		connect: ({ Style }) => Style(":host",{ ...HelperStyles, ...hideStyles })
	},
	hide: {
		get: (host) => () => {
			host.RemoveTransition(":host", "*")
			host.RemoveTransition("#PageWrapper", "*")
			host.Style(":host", hideStyles);
			host.page = 0;
		}
	},
	page: {
		set: ({ Style, AddTransition, RemoveTransition }, page) => {
			const styleMap = [
				{ width: 200, height: 100 },
				{ width: 300, height: 200 }
			]
			if(page) {
				AddTransition(":host", "width .3s linear")
				AddTransition(":host", "height .3s linear")
			} 
			Style(":host", styleMap[page])
			Style("#PageWrapper", PageWrapperOffsett(page))
		}
	},
	goToPage: {
		get: host => page => () => host.page = page,
	},
	render: (host) => { 
		return html`
		<div id="PageWrapper">
			${[mainPage, emailPage].map(((fn,i) => html`
				<div id="Page-${i}">${fn(host)}</div>
			`))}
		</div>
		`
	}
}
