import { html } from "hybrids";
import { initialize, styleProperty, method } from "../factories.js";
import { getCorner, getPosition, getAbsolutePosition } from '../position.js';
import { MainPage } from "./main.js";
import { EmailPage } from "./email.js";
import { initStyles, BoxTail } from "./styles.js";

export const HighlightHelper = {
	...initialize({
		":host": initStyles,
		"#HelperBox": { overflow: "hidden" },
		"#BoxTail": BoxTail,
		"#PageWrapper": { position: "relative", width: "200%", right: 0 },
		"[id|=Page]": { width: "50%", float: "left" },
	}),
	opacity: styleProperty(":host", "opacity", 0),
	top: styleProperty(":host", "top", 0),
	left: styleProperty(":host", "left", 0),
	width: styleProperty("#HelperBox", "width", 0),
	height: styleProperty("#HelperBox", "height", 0),
	PageWrapper: styleProperty("#PageWrapper", "right", 0),
	
	AbsolutePosition: { get: getAbsolutePosition },
	corner: { get: getCorner },
	position: { get: getPosition },
	
	show: method(host => () => {
		const { position, page } = host
		const { left, top } = position({ width: 200, height: 100 })
		host.width = 200;
		host.height = 100;
		host.left = left;
		host.top = top;
		host.opacity = { value: 1, transition: ".5s linear"}
	}),
	hide: method((host) => () => {
		host.opacity = 0;
		host.width = 0;
		host.height = 0;
		host.left = 0;
		host.top = 0;
		host.PageWrapper = 0;
	}),
	Pages: { get: () => [ MainPage, EmailPage ] },
	goToPage: {
		get: host => n => () => {
			const index = host.Pages.findIndex(({name}) => name == n)			
			if(!(index + 1)) {
				console.log("Error page name", name," undefined.")
				return
			} 
			const { Pages } = host;
			const Page = Pages[index];
			if (!Page) return
			const { props, transitions } = Page
			if (props) Object.keys(props).forEach(k => host[k] = props[k])
			host.PageWrapper = { value: `${index * 100}%`, transition: ".3s linear" };
		}
	},

	render: (host) => html`
		<div id="HelperBox">
			<div id="PageWrapper">
			${host.Pages.map((({template},i) => html`
				<div id="Page-${i}">${template(host)}</div>
			`))}
			</div>
		</div>
		<div id="BoxTail"></div>`
}
