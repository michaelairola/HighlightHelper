import { html } from 'hybrids';

export const MainPage = {
	name: "main-page",
	hostStyle: { width: 200, height: 100 }, 
	template: ({ goToPage }) => html`
		<div>This uses Hybrid, and also is minified! so sweet!!!</div>
		<button onclick="${goToPage("email-page")}">Change Page!</button>
	`,
}