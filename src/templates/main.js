import { html } from 'hybrids';

export const MainPage = {
	name: "main-page",
	props: {
		width: { value: 200, transition: ".3s linear" }, 
		height: { value: 100, transition: ".3s linear" } 
	}, 
	template: ({ goToPage }) => html`
		<div>This uses Hybrid, and also is minified! so sweet!!!</div>
		<button onclick="${goToPage("email-page")}">Change Page!</button>
	`,
}