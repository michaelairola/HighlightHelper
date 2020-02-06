import { html } from './html-template';

const trans = `opacity .5s linear`
const HelperStyle = ({ left, top }) => html`
	<style>
		:host {
			position: absolute;
			border: solid 2px grey;
			border-radius: 5px;
			background: #bbb;
			opacity: 0;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
		}
		:host(.show) { 
			opacity: 1;
			transition: ${trans};
			-webkit-transition: ${trans};
			-moz-transition: ${trans};
			-ms-transition: ${trans};
			-o-transition: ${trans};
			top: ${top}px;
			left: ${left}px;
			width: 200px;
			height: 100px;
		}
		.captcha {
			width: 90%;
			height: 70%;
		}
	</style>
`
export const defineHelperElement = Id => {
	class HighlightHelper extends HTMLElement {
		constructor() {
			super();
		}
		Style() { 
			return HelperStyle(this)
		}

		render() {
			this.id = Id
			const shadowRoot = this.attachShadow({ mode: "open" })
			shadowRoot.innerHTML = html`
			${this.Style()}
			<div>Hello World!</div>
		`}
		connectedCallback() {
			if(!this.rendered) {
				this.render()
				this.classList.add("show") 
				this.rendered = true
			}
		}
	}
	window.customElements.define(Id, HighlightHelper)
}
