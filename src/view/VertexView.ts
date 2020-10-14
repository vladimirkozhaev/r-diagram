import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex'



export class VertexView extends joint.shapes.standard.Ellipse {
	_vertex: Vertex;
	constructor(vertex: Vertex) {
		super()
		this._vertex = vertex;
		this.position(this._vertex.point.x, this._vertex.point.y);
		this.resize(60, 60);
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
	

	
}
