import { html } from 'hybrids';

export const mainPage = ({ goToPage }) => html`
	<div>This uses Hybrid, and also is minified! so sweet!!!</div>
	<button onclick="${goToPage(1)}">Change Page!</button>
`;
