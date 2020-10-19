
/*
* http://usejsdoc.org/
*/
import * as joint from 'jointjs';
import {LinkModel} from "./../model/LinkModel"

export class MyLink extends joint.shapes.standard.Link{
	_linkModel:LinkModel;
	constructor(lm:LinkModel){
		super()
		this._linkModel=lm
		
	}
	
	protected pointerclick(evt: joint.dia.Event, x: number, y: number){
		alert("click")	
	}
	
	public get linkModel():LinkModel{
		return this._linkModel
	}
	
	
}