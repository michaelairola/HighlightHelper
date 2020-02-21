import { html } from "hybrids";

export const emailPage = () => html`
	<div>Another page!</div>
	<button onclick="${host => host.page = 0}">Go back</button>
`;

