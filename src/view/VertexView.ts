import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex'



export class VertexView extends joint.shapes.standard.Ellipse {
	_vertex: Vertex;
	constructor(vertex: Vertex) {
		super()
		this._vertex = vertex;
		
		this._vertex.point.on("x:changed",x=>{
			
			this.position(this._vertex.point.x*100+200, this._vertex.point.y*100+200);
		})
		
		this._vertex.point.on("y:changed",y=>{
			
			this.position(this._vertex.point.x*100+200, this._vertex.point.y*100+200);
		})
		
		this.setPositionToModelPoint();
		this.resize(30, 30);
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
	
	public  get model():Vertex{
		return this._vertex;
	}
	public setPositionToModelPoint() {
		this.position(this._vertex.point.x * 100 + 200, this._vertex.point.y * 100 + 200);
	}

	public toString():String{
		return "vertex view:"+this._vertex.toString();
	}
	
}
