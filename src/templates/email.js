import { html } from "hybrids";

export const emailPage = ({ goToPage }) => html`
	<div>Another page! These transitions are super easy to work with! so fun :)</div>
	<button onclick="${goToPage(0)}">Go back</button>
`;

