import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex'



export class VertexView extends joint.shapes.standard.Ellipse {
	_vertex: Vertex;
	constructor(vertex: Vertex) {
		super()
		this._vertex = vertex;
		this.position(this._vertex.point.x*100+200, this._vertex.point.y*100+200);
		this.resize(10, 10);
		this.attr({
			body: {
				fill: 'white',
				stroke: 'black',
				strokeWidth: 2
			},
			label: {
				text: '',
				fill: 'black'
			}
		});
		
		
	}
	
	
	public toString():String{
		return "vertex view:"+this._vertex.toString();
	}
	
}
