import { html } from 'hybrids';

export const mainPage = () => html`
	<div>This uses Hybrid, and also is minified! so sweet!!!</div>
	<button onclick="${host => host.page=2}">Change Page!</button>
`;
