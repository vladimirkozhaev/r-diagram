import * as B from 'Backbone';
import {Vertex} from "./Vertex"
import {Point} from "./Point"


export class GraphModel extends	 B.Model{
	_vertex:B.Collection<Vertex> = new B.Collection<Vertex>(); 
	
	constructor(v:B.Collection<Vertex>){
		super()
		alert("vertex inside the constructor:"+v)
		this._vertex=v;
	}
	
	public get vertex():B.Collection<Vertex>{
		return this._vertex;
	}
	
	public static createTestModel():GraphModel{
		var vertex:B.Collection<Vertex> = new B.Collection<Vertex>()
		vertex.add(new Vertex(new Point(0,0,true)))
		vertex.add(new Vertex(new Point(100,0,true)))
		return new GraphModel(vertex);
	}	
}