import { html } from "hybrids";
import { Style, AddTransition, RemoveTransition } from "../factories.js";
import { getPosition } from '../position.js';
import { MainPage } from "./main.js";
import { EmailPage } from "./email.js";
import { HelperStyles, showStyles, hideStyles, HelperBoxStyles, BoxTail } from "./styles.js";

export const HighlightHelper = {
	// putting connect function here just because
	connect: { connect: ({ Style }) => {
			Style(":host", { ...HelperStyles, ...hideStyles });
			Style("#HelperBox", HelperBoxStyles);
			Style("#BoxTail", BoxTail);
			Style("#PageWrapper", { position: "relative", width: "200%", right: 0 });
			Style("[id|=Page]", { width: "50%", float: "left" });
	} },
	Style, AddTransition, RemoveTransition,
	show: {
		get: host => () => {
			const { Style, AddTransition } = host
			const { position, left, top } = getPosition();
			AddTransition(":host", "opacity .5s linear")
			AddTransition("#PageWrapper", "right .3s linear")
			Style(":host", showStyles({ left, top }));
		},
	},
	hide: {
		get: (host) => () => {
			host.RemoveTransition(":host", "*")
			host.RemoveTransition("#HelperBox", "*")
			host.RemoveTransition("#PageWrapper", "*")
			host.Style(":host", hideStyles);
			host.page = 0;
		}
	},
	Pages: { get: () => [ MainPage, EmailPage ] },
	page: {
		set: ({ Style, AddTransition, Pages, show }, index) => {
			const Page = Pages[index];
			if (!Page) return
			const { hostStyle, transitions } = Page
			if(transitions) transitions.forEach(t => AddTransition("#HelperBox", t))
			if (hostStyle) Style("#HelperBox", hostStyle)
			Style("#PageWrapper", { right: `${index * 100}%` })
			show();
		}
	},
	goToPage: {
		get: host => n => () => {
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
