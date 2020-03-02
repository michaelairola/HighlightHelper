import { html } from "hybrids";

export const Styles = html`
<style>
	#HelperBox {
		position: absolute;
		z-index: 2147483647;
		box-shadow: 0 30px 90px -20px rgba(0,0,0,.3), 0 0 1px 1px rgba(0,0,0,.5);
		font-size: 14px;
		line-height: 20px;
		border: solid 1px black;
		border-radius: 2px;
		background: #fff;
		
		user-select: none;
		webkit-user-select: none;
		moz-user-select: none;
	}
	.No-Overflow {
		height: 100%;
		overflow: hidden;
	}
	#PageWrapper { 
		position: relative;
		width: 200%;
		right: 0
	}
	.page { 
		margin: 5px 15px 0px 15px;
	}
	button { 
		margin-top: 5px;
	}
	[id|=Page] { 
		float: left;
		padding-top:10px;
		padding-bottom: 10px;
	}
	[id|=BoxTail] {
		content: '';
		position: absolute;
		border: 10px solid transparent;
	}
	[id|=BoxTail-top-right] {
		border-bottom: 0;
		border-top: 11px solid;
		left: 7px;
	}
	[id|=BoxTail-top-left] {
		border-top: 11px solid;
		border-bottom: 0;
		left: 85%;
	}
	[id|=BoxTail-bottom-left] {
		border-top: 0;
		border-bottom: 11px solid;
		left: 85%;
	}
	[id|=BoxTail-bottom-right] {
		border-top: 0;
		border-bottom: 11px solid;
		left: 5%;
	}
	[id$=border] {
		border-top-color: black;
	}
	#BoxTail-top-right {
		border-top-color: #fff;
		bottom: -10px;
	}
	#BoxTail-top-left {
		border-top-color: #fff;
		bottom: -10px;
	}
	#BoxTail-bottom-left {
		border-bottom-color: #fff;
		top: -10px;
	}
	#BoxTail-bottom-right {
		border-bottom-color: #fff;
		top: -10px;
	}
	#BoxTail-top-right-border {
		bottom: -12px;
	}
	#BoxTail-top-left-border {
		bottom: -12px;
	}
	#BoxTail-bottom-left-border {
		top: -12px;
	}
	#BoxTail-bottom-right-border {
		top: -12px;
	}
</style>`