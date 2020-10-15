import * as B from 'Backbone';
import {Vertex} from "./Vertex"
import {Point} from "./Point"
import {Edge} from "./Edge"


export class GraphModel extends	 B.Model{
	_vertex:B.Collection<Vertex> = new B.Collection<Vertex>(); 
	
	constructor(v:B.Collection<Vertex>){
		super()
	
		this._vertex=v;
	}
	
	public get vertex():B.Collection<Vertex>{
		return this._vertex;
	}
	
	public static createTestModel():GraphModel{
		var vertex:B.Collection<Vertex> = new B.Collection<Vertex>()
		var start:Vertex=new Vertex(new Point(0,0,true));
		var end:Vertex=new Vertex(new Point(100,0,true));
		var edge:Edge=new Edge();
		edge.startVertex=start;
		edge.endVertex=end;
		start.startEdges.add(edge)
		end.endEdges.add(edge)
		alert("create test model "+start.startEdges.size()+" "+end.endEdges.size());
		vertex.add(start)
		vertex.add(end)
		return new GraphModel(vertex);
	}	
}