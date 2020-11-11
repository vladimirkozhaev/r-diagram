import * as B from 'Backbone';
import { Vertex } from "./Vertex"
import { Point } from "./Point"
import { LinkModel } from "./LinkModel"


export class GraphModel extends B.Model {
	_vertex: B.Collection<Vertex> = new B.Collection<Vertex>();

	constructor(v: B.Collection<Vertex>) {
		super()

		this._vertex = v;
	}

	public get vertex(): B.Collection<Vertex> {
		return this._vertex;
	}
	/**
	 * @returns true if we haven't vertex with this coords	
	 */
	public addVertex(vertex:Vertex):boolean{
		if (this._vertex.filter(v=>v.point.x==vertex.point.x&&v.point.y==vertex.point.y).length>0){
			return false
		}
		this._vertex.add(vertex)
		return true;
	}
	
	public isLineBetweenFree(startX:number,endX:number,y:number):boolean{
		return this._vertex.filter(v=>{
			return v.point.x>startX&&v.point.x<endX&&v.point.y==y
		}).length==0
	}
	
	public foundFreeHorizontal(startX:number,endX:number,y:number,down:boolean):number{
		while(!this.isLineBetweenFree(startX,endX,y)){
			y=down?y+1:y-1;
		}
		return y
	}
	
	
	public get points(){
		
		
		return this._vertex.foldl((a:B.Collection<Point>,vertex:Vertex)=>{
			a.add(vertex.point)
			return vertex.points.foldl((a1:B.Collection<Point>,b1:Point)=>{
				a1.add(b1)
				return a1},a);
		},new B.Collection<Point>())
		
	}

	public static createTestModel(): GraphModel {
		var vertex: B.Collection<Vertex> = new B.Collection<Vertex>()
		var start: Vertex = new Vertex(new Point(0, 0, true));
		var end: Vertex = new Vertex(new Point(1, 0, true));
		var edge: LinkModel;

		edge = new LinkModel();
		start.startEdges.add(edge)
		end.endEdges.add(edge)
		edge.startVertex = start;
		edge.endVertex = end;


		edge = new LinkModel();
		edge.startVertex = start;
		edge.endVertex = end;
		edge.points.add(new Point(0, 1, false))
		edge.points.add(new Point(1, 1, false))
		start.startEdges.add(edge)
		end.endEdges.add(edge)


		edge = new LinkModel();
		edge.startVertex = end;
		edge.endVertex = start;
		edge.points.add(new Point(1, -1, false))
		edge.points.add(new Point(0, -1, false))
		start.endEdges.add(edge)
		end.startEdges.add(edge)

		edge = new LinkModel();
		edge.startVertex = start;
		edge.endVertex = end;
		edge.points.add(new Point(0, 2, false))
		edge.points.add(new Point(1, 2, false))
		start.startEdges.add(edge)
		end.endEdges.add(edge)

		vertex.add(start)
		vertex.add(end)
		return new GraphModel(vertex);
	}
}