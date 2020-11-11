import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex'
import * as Consts from './Consts'


export class VertexView extends joint.shapes.standard.Ellipse {
	_vertex: Vertex;
	constructor(vertex: Vertex) {
		super()
		this._vertex = vertex;
		
		this._vertex.point.on("x:changed",x=>{
			
			this.setPositionToModelPoint();
		})
		
		this._vertex.point.on("y:changed",y=>{
			
			this.setPositionToModelPoint()
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
		this.position(this._vertex.point.x * Consts.LINK_DISTANCE + Consts.X_SHIFT, this._vertex.point.y * Consts.LINK_DISTANCE + Consts.Y_SHIFT);
	}

	public toString():String{
		return "vertex view:"+this._vertex.toString();
	}
	
}
