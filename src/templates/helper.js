import { html } from "hybrids";
import { Style, AddTransition, RemoveTransition, styleProperty } from "../factories.js";
import { getPosition } from '../position.js';
import { MainPage } from "./main.js";
import { EmailPage } from "./email.js";
import { initStyles, BoxTail } from "./styles.js";

export const HighlightHelper = {
	Style, AddTransition, RemoveTransition,
	connect: { connect: ({ Style }) => {
			Style(":host", initStyles);
			Style("#HelperBox", { overflow: "hidden" });
			Style("#BoxTail", BoxTail);
			Style("#PageWrapper", { position: "relative", width: "200%", right: 0 });
			Style("[id|=Page]", { width: "50%", float: "left" });
	} },
	top: styleProperty(":host", "top"),
	left: styleProperty(":host", "left"),
	width: styleProperty("#HelperBox", "width"),
	height: styleProperty("#HelperBox", "height"),
	show: {
		get: host => () => {
			const { Style, AddTransition } = host
			const { position, left, top } = getPosition(host);
			AddTransition(":host", "opacity .5s linear")
			AddTransition("#PageWrapper", "right .3s linear")
			host.left = left;
			host.top = top;
			Style(":host", { opacity: 1 });
		},
	},
	hide: {
		get: (host) => () => {
			host.RemoveTransition(":host", "*")
			host.RemoveTransition("#HelperBox", "*")
			host.RemoveTransition("#PageWrapper", "*")
			host.Style(":host", { opacity: 0 });
			host.page = 0;
		}
	},
	Pages: { get: () => [ MainPage, EmailPage ] },
	page: {
		set: (host, index) => {
			const { Style, AddTransition, Pages } = host;
			const Page = Pages[index];
			if (!Page) return
			const { props, transitions } = Page
			if(transitions) transitions.forEach(t => AddTransition("#HelperBox", t))
			if (props) Object.keys(props).forEach(k => host[k] = props[k])
			Style("#PageWrapper", { right: `${index * 100}%` })
		}
	},
	goToPage: {
		get: host => n => () => {
			const { AddTransition } = host;
			AddTransition("#HelperBox", "left .3s linear")
			AddTransition("#HelperBox", "top .3s linear")
			const index = host.Pages.findIndex(({name}) => name == n)
			if(index + 1) host.page = index
			else console.log("Error page name", name," undefined.")
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
