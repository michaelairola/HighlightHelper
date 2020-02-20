import { html } from "hybrids";

const HelperStyles = {
	position: "absolute",
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
const trans = `opacity .5s linear`;
const showStyles = ({ left, top }) => ({
	transition: trans,
	top: `${top}px`,
	left: `${left}px`,
	width: "200px",
	height: "100px",
	opacity: 1,
})

export const HighlightHelper = {
	show: {
		set: (host, show) => host.Style = show && show.left && show.top ? showStyles(show) : hideStyles,
		connect: host => host.Style = { ...HelperStyles, ...hideStyles }
	},
	Style: { set: (host, v) => Object.keys(v).forEach(k => host.style[k] = v[k]) },
	render:  () => html`
		<div>This uses Hybrid, and also is minified! so sweet!!!</div>
	`
}
