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
	}
	
	get point():Point{
		return this._point;
	}
	
}

