import * as B from 'Backbone';
import {Point} from "./Point"
import {Edge} from "./Edge"

/*
* http://usejsdoc.org/
*/
export class Vertex extends B.Model{
	_point:Point;
	_startEdges:B.Collection<Edge>
	_endEdges:B.Collection<Edge>
	
	constructor(_point:Point){
		super();
		this._point=_point;
		this._startEdges=new B.Collection<Edge>()
		this._endEdges=new B.Collection<Edge>()
	}
	
	public get point():Point{
		return this._point;
	}
	
	public get startEdges():B.Collection<Edge>{
		return this._startEdges
	}
	
	public get endEdges():B.Collection<Edge>{
		return this._endEdges
	}
	
	public toString():String{
		return "point "+this._point.toString();
	}
}

