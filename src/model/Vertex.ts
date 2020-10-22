import * as B from 'Backbone';
import {Point} from "./Point"
import {LinkModel} from "./LinkModel"

/*
* http://usejsdoc.org/
*/
export class Vertex extends B.Model{
	_point:Point;
	_startEdges:B.Collection<LinkModel>
	_endEdges:B.Collection<LinkModel>
	_vertices:B.Collection<Point>
	
	constructor(_point:Point){
		super();
		this._point=_point;
		this._startEdges=new B.Collection<LinkModel>()
		this._endEdges=new B.Collection<LinkModel>()
		
	}
	
	public get point():Point{
		return this._point;
	}
	
	public get startEdges():B.Collection<LinkModel>{
		return this._startEdges
	}
	
	public get endEdges():B.Collection<LinkModel>{
		return this._endEdges
	}
	
	public toString():String{
		return "point "+this._point.toString();
	}
	
	public getPoints():B.Collection<Point>{
		var collection:B.Collection<Point>=new B.Collection();	
		collection.add(this._point)
		this._startEdges.forEach(edge=>{
			collection.add(edge.points)
		})
		return collection;
	}
}

