import { html } from "hybrids";

export const emailPage = () => html`
	<div>Another page!</div>
	<button onclick="${host => host.page = 1}">Go back</button>
`;

