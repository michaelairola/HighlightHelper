import { html } from "hybrids";
import { Style, AddTransition, RemoveTransition } from "../factories.js";

import { MainPage } from "./main.js";
import { EmailPage } from "./email.js";
import { HelperStyles, showStyles, hideStyles } from "./styles.js";

export const HighlightHelper = {
	Style, AddTransition, RemoveTransition,
	show: {
		set: ({ Style, AddTransition }, show) => {
			AddTransition(":host", "opacity .5s linear")
			AddTransition("#PageWrapper", "right .3s linear")
			Style(":host", showStyles(show));
		},
		connect: ({ Style }) => {
			Style(":host",{ ...HelperStyles, ...hideStyles })
			Style("#PageWrapper", { position: "relative", width: "200%", right: 0 });
			Style("[id|=Page]", { width: "50%", float: "left" });
		}
	},
	hide: {
		get: (host) => () => {
			host.RemoveTransition(":host", "*")
			host.RemoveTransition("#PageWrapper", "*")
			host.Style(":host", hideStyles);
			host.page = 0;
		}
	},
	Pages: { get: () => [ MainPage, EmailPage ] },
	page: {
		set: ({ Style, AddTransition, Pages }, index) => {
			const Page = Pages[index];
			if (!Page) return
			const { hostStyle, transitions } = Page
			if(transitions) transitions.forEach(t => AddTransition(":host", t))
			if (hostStyle) Style(":host", hostStyle)
			Style("#PageWrapper", { right: `${index * 100}%` })
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
		<div id="PageWrapper">
			${host.Pages.map((({template},i) => html`
				<div id="Page-${i}">${template(host)}</div>
			`))}
		</div>`
}
