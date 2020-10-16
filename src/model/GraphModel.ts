import * as B from 'Backbone';
import { Vertex } from "./Vertex"
import { Point } from "./Point"
import { Edge } from "./Edge"


export class GraphModel extends B.Model {
	_vertex: B.Collection<Vertex> = new B.Collection<Vertex>();

	constructor(v: B.Collection<Vertex>) {
		super()

		this._vertex = v;
	}

	public get vertex(): B.Collection<Vertex> {
		return this._vertex;
	}

	public static createTestModel(): GraphModel {
		var vertex: B.Collection<Vertex> = new B.Collection<Vertex>()
		var start: Vertex = new Vertex(new Point(0, 0, true));
		var end: Vertex = new Vertex(new Point(1, 0, true));
		var edge: Edge;

		edge = new Edge();
		start.startEdges.add(edge)
		end.endEdges.add(edge)
		edge.startVertex = start;
		edge.endVertex = end;


		edge = new Edge();
		edge.startVertex = start;
		edge.endVertex = end;
		edge.points.add(new Point(0, 1, false))
		edge.points.add(new Point(1, 1, false))
		start.startEdges.add(edge)
		end.endEdges.add(edge)


		edge = new Edge();
		edge.startVertex = end;
		edge.endVertex = start;
		edge.points.add(new Point(1, -1, false))
		edge.points.add(new Point(0, -1, false))
		start.endEdges.add(edge)
		end.startEdges.add(edge)

		edge = new Edge();
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