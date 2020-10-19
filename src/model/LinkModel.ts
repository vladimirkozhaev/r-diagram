import * as B from 'Backbone';
import { Vertex } from './Vertex'
import { Point } from './Point'
/*
* http://usejsdoc.org/
*/
export class LinkModel extends B.Model {
	_starVertex: Vertex;
	_endVertex: Vertex;
	_points: B.Collection<Point>;

	constructor() {
		super()
		this._points = new B.Collection<Point>();
	}

	public set startVertex(_startVertex: Vertex) {
		this._starVertex = _startVertex;
	}

	public set endVertex(_endVertex: Vertex) {
		this._endVertex = _endVertex;
	}


	public get startVertex(): Vertex {
		return this._endVertex;
	}

	public get endVertex(): Vertex {
		return this._endVertex;
	}

	public get points(): B.Collection<Point> {
		return this._points;
	}
	
	public toString(){
		return this._starVertex+" "+this._endVertex
	}


}
