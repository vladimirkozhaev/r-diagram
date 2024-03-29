import * as B from 'Backbone';
import {Point} from "./Point"
import {LinkModel} from "./LinkModel"
import {IPointsContainer} from './IPointsContainer'


/*
* http://usejsdoc.org/
*/
export class Vertex extends B.Model implements IPointsContainer{
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
	
	public get points():B.Collection<Point>{
		var initCol:B.Collection<Point>=new B.Collection();	
		initCol.add(this._point)
		var thePoints= this._startEdges.foldl((collection:B.Collection<Point>,edge:LinkModel)=>{
			return edge.points.foldl((c:B.Collection<Point>,p:Point)=>{
				c.add(p)
				return c;
			},collection);
		}, initCol)		
		
		return thePoints;
	}
}

