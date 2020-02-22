import { html } from "hybrids";

export const EmailPage = {
	name: "email-page",
	props: { 
		width: { value: 300, transition: ".3s linear" }, 
		height: { value: 200, transition: ".3s linear" } 
	},
	template: ({ goToPage }) => html`
		<div>Another page! These transitions are super easy to work with! so fun :)</div>
		<button onclick="${goToPage("main-page")}">Go back</button>
	`,
}