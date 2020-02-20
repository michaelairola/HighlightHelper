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
	top: `${top}px`,
	left: `${left}px`,
	width: "200px",
	height: "100px",
	opacity: 1,
})

const PageStyle = {
	width: "50%",
	float: "left",
}
export const HighlightHelper = {
	Style: { set: (host, v) => Object.keys(v).forEach(k => host.style[k] = v[k]) },
	page: 0,
	show: {
		set: (host, show) => {
			if (show) {
				host.Style = showStyles(show);
			} else {
				host.Style = hideStyles;
				host.page = 0
			}
		},
		connect: host => host.Style = { ...HelperStyles, ...hideStyles }
	},
	
	PageWrapperStyle: ({ page }) => ({
		transition: "right .3s linear",
		position: "relative",
		width: "200%",
		right: `${page*100}%`,
	}),
	
	render: ({ PageWrapperStyle }) => html`
	<div style="${PageWrapperStyle}">
		${[mainPage, emailPage].map((fn => html`
			<div style="${PageStyle}">${fn()}</div>
		`))}
	</div>
	`
}
