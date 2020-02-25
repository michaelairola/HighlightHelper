import { html } from "hybrids";

export const Styles = html`
<style>
	:host {
		position: absolute;
		boxShadow: 0 30px 90px -20px rgba(0,0,0,.3), 0 0 1px 1px rgba(0,0,0,.5);
		fontSize: 14px;
		line-height: 20px;
		border: solid 1px black;
		border-radius: 2px;
		background: #fff;
		
		user-select: none;
		webkit-user-select: none;
		moz-user-select: none;
	}
	#HelperBox { 
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
		width: 50%;
		float: left;
		padding-top:10px;
		padding-bottom: 10px;
	}
	#BoxTail-top-right {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-bottom: 0;
		border-top: 11px solid #fff;
		bottom: -10px;
		left: 7px;
	}
	#BoxTail-top-right-border {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-bottom: 0;
		border-top: 11px solid black;
		bottom: -12px;
		left: 7px;
	}
	#BoxTail-top-left {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-bottom: 0;
		border-top: 11px solid #fff;
		bottom: -10px;
		left: 85%;
	}
	#BoxTail-top-left-border {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-bottom: 0;
		border-top: 11px solid black;
		bottom: -12px;
		left: 85%;
	}
	#BoxTail-bottom-left {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-top: 0;
		border-bottom: 11px solid #fff;
		top: -10px;
		left: 85%;
	}
	#BoxTail-bottom-left-border {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-top: 0;
		border-bottom: 11px solid black;
		top: -12px;
		left: 85%;
	}
	#BoxTail-bottom-right {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-top: 0;
		border-bottom: 11px solid #fff;
		top: -10px;
		left: 5%;
	}
	#BoxTail-bottom-right-border {
		content: '';
		position: absolute;
		border: 10px solid transparent;
		border-top: 0;
		border-bottom: 11px solid black;
		top: -12px;
		left: 5%;
	}
</style>`