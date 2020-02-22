import { html } from "hybrids";
import { 
	initialize, 
	styleProperty, changeProps, 
	getter, method 
} from "./factories.js";
import { getPosition } from './position.js';

const goToPage = index => host => host.page = { value: `${index * 100}%`, transition: ".3s linear" }
const MainPage = {
	name: "main-page",
	props: { width: 200, height: 100 },
	render: host => html`
		<div>This uses Hybrid, and also is minified! so sweet!!!</div>
		<button onclick="${goToPage(1)}">Change Page!</button>
	`,
}
const EmailPage = {
	name: "email-page",
	props: { width: 300, height: 200 },
	render: host => html`
		<div>Another page! These transitions are super easy to work with! so fun :)</div>
		<button onclick="${goToPage(0)}">Go back</button>
	`,
}
const Pages = [ MainPage, EmailPage ]
export const HighlightHelper = {
	...initialize({
		":host": {
			position: "absolute",
			boxShadow: "0 30px 90px -20px rgba(0,0,0,.3), 0 0 1px 1px rgba(0,0,0,.5)",
			fontSize: "14px",
			lineHeight: "20px",
			borderRadius: "2px",
			background: "#fff",
		},
		"#HelperBox": { overflow: "hidden" },
		"#BoxTail": {
			content: '',
			position: "absolute",
			border: "10px solid transparent",
			borderBottom: 0,
			borderTop: "11px solid #fff",
			bottom: "-7px",
			left: "7px",
		},
		"#PageWrapper": { position: "relative", width: "200%", right: 0 },
		"[id|=Page]": { width: "50%", float: "left" },
	}),
	opacity: styleProperty(":host", "opacity", 0),
	top: styleProperty(":host", "top", 0),
	left: styleProperty(":host", "left", 0),
	width: styleProperty("#HelperBox", "width", 0),
	height: styleProperty("#HelperBox", "height", 0),
	page: styleProperty("#PageWrapper", "right", 0),
	
	position: getter(getPosition),
	show: method(host => () => {
		changeProps(host, { width: 200, height: 100 })
		const { left, top } = host.position
		changeProps(host, { left, top, opacity: { value: 1, transition: ".5s linear" }})
	}),
	hide: method(host => () => changeProps(host, { opacity: 0, top: 0, left: 0, width: 0, height: 0, page: 0 })),
	render: (host) => html`
		<div id="HelperBox">
			<div id="PageWrapper">
			${Pages.map((({ render },i) => html`
				<div id="Page-${i}">${render(host)}</div>
			`))}
			</div>
		</div>
		<div id="BoxTail"></div>`
}
