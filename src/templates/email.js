import { html } from "hybrids";

export const EmailPage = {
	name: "email-page",
	props: { width: 300, height: 200 },
	transitions: [ "width .3s linear", "height .3s linear" ],
	template: ({ goToPage }) => html`
		<div>Another page! These transitions are super easy to work with! so fun :)</div>
		<button onclick="${goToPage("main-page")}">Go back</button>
	`,
}