import * as B from 'Backbone';
import {Vertex} from "./Vertex"
import {Point} from "./Point"


export class GraphModel{
	_vertex:B.Collection<Vertex> = new B.Collection<Vertex>(); 
	
	constructor(_vertex:B.Collection<Vertex>){
		this._vertex=_vertex;
	}
	
	get vertex():B.Collection<Vertex>{
		return this._vertex;
	}
	
	static createTestModel():GraphModel{
		var vertex:B.Collection<Vertex> = new B.Collection<Vertex>()
		vertex.add(new Vertex(new Point(0,0,true)))
		vertex.add(new Vertex(new Point(100,0,true)))
		return new GraphModel(vertex);
	}	
}