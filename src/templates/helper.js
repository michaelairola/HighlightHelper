import { html } from "hybrids";
import { mainPage } from "./main.js";
import { emailPage } from "./email.js";

const HelperStyles = {
	position: "absolute",
	overflow: "hidden",
	border: "solid 2px grey",
	borderRadius: "5px",
	background: "#bbb",
}
const hideStyles = {
	transition: "none",
	top: 0, 
	left: 0,
	width: 0,
	height: 0,
	opacity: 0,
}
const showStyles = ({ left, top }) => ({
	transition: "opacity .5s linear",
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
const PageWrapperOffsett = (page) => ({
	transition: page ? "right .3s linear" : "none",
	right: page ? `${(page-1)*100}%` : 0,
})
const PageStyle = {
	width: "50%",
	float: "left",
}
const connectStyle = (host, v) => Object.keys(v).forEach(k => host.style[k] = v[k])

export const HighlightHelper = {
	Style: { set: connectStyle },
	page: {
		set: (host, page) => {
			connectStyle(host.PageWrapper, PageWrapperOffsett(page))
			return page
		}
	},
	show: {
		set: (host, show) => {
			if (show) {
				connectStyle(host.PageWrapper, PageWrapperStyle);
				host.Style = showStyles(show);
			} else {
				host.Style = hideStyles;
				host.page = 0
			}
		},
		connect: host => host.Style = { ...HelperStyles, ...hideStyles }
	},
	PageWrapper: ({ render }) => render().querySelector("#PageWrapper"),
	
	render: () => html`
	<div id="PageWrapper">
		${[mainPage, emailPage].map((fn => html`
			<div style="${PageStyle}">${fn()}</div>
		`))}
	</div>
	`
}
