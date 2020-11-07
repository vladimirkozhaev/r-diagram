import * as B from 'Backbone';
import { Vertex } from './Vertex'
import { Point } from './Point'
import { IPointsContainer } from './IPointsContainer'
/*
* http://usejsdoc.org/
*/
export class LinkModel extends B.Model implements IPointsContainer {
	_startVertex: Vertex;
	_endVertex: Vertex;
	_points: B.Collection<Point>;

	constructor() {
		super()
		this._points = new B.Collection<Point>();
	}

	public set startVertex(_startVertex: Vertex) {
		this._startVertex = _startVertex;
	}

	public set endVertex(_endVertex: Vertex) {
		this._endVertex = _endVertex;
	}


	public get startVertex(): Vertex {
		return this._startVertex;
	}

	public get endVertex(): Vertex {
		return this._endVertex;
	}

	public get points(): B.Collection<Point> {
		return this._points;
	}

	public set points(p: B.Collection<Point>) {
		this._points = p;
	}

	public toString() {
		return this._startVertex + " " + this._endVertex
	}


}
