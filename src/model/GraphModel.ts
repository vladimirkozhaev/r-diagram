import * as B from 'Backbone';
import { Vertex } from "./Vertex"
import { Point } from "./Point"
import { LinkModel } from "./LinkModel"


const START_X = 0;
const START_Y = 0;
const END_X = 1;
const END_Y = 0;
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
	public addVertex(vertex: Vertex): boolean {
		if (this._vertex.filter(v => v.point.x == vertex.point.x && v.point.y == vertex.point.y).length > 0) {
			return false
		}
		this._vertex.add(vertex)
		return true;
	}

	public isLineBetweenFree(startX: number, endX: number, y: number): boolean {
		return this.points.filter(v => {
			return v.x >= startX && v.x <= endX && v.y == y
		}).length == 0
	}

	public foundFreeHorizontal(startX: number, endX: number, y: number, down: boolean): number {
		if (!down) {
			var temp = startX
			startX = endX
			endX = temp
		}
		while (!this.isLineBetweenFree(startX, endX, y)) {
			y = down ? y + 1 : y - 1;
		}
		return y
	}


	public get points() {


		return this._vertex.foldl((a: B.Collection<Point>, vertex: Vertex) => {
			a.add(vertex.point)
			return vertex.points.foldl((a1: B.Collection<Point>, b1: Point) => {
				a1.add(b1)
				return a1
			}, a);
		}, new B.Collection<Point>())

	}

	public static createTestModel(): GraphModel {
		var vertex: B.Collection<Vertex> = new B.Collection<Vertex>()

		GraphModel.addTwoPoins(vertex, START_X, START_Y, END_X, END_Y);

		GraphModel.addTwoPoins(vertex, START_X, START_Y + 5, END_X, END_Y + 5);


		return new GraphModel(vertex);
	}

	private static addTwoPoins(vertex: B.Collection<Vertex>, x1: number, y1: number, x2: number, y2: number): void {
		var start: Vertex = new Vertex(new Point(x1, y1, true));
		var end: Vertex = new Vertex(new Point(x2, y2, true));
		var edge: LinkModel;

		edge = new LinkModel();
		start.startEdges.add(edge);
		end.endEdges.add(edge);
		edge.startVertex = start;
		edge.endVertex = end;


		edge = new LinkModel();
		edge.startVertex = start;
		edge.endVertex = end;
		edge.points.add(new Point(x1 + 0, y1 + 1, false));
		edge.points.add(new Point(x1 + 1, y1 + 1, false));
		start.startEdges.add(edge);
		end.endEdges.add(edge);


		edge = new LinkModel();
		edge.startVertex = end;
		edge.endVertex = start;
		edge.points.add(new Point(x1 + 1, y1 - 1, false));
		edge.points.add(new Point(x1 + 0, y1 - 1, false));
		start.endEdges.add(edge);
		end.startEdges.add(edge);

		edge = new LinkModel();
		edge.startVertex = start;
		edge.endVertex = end;
		edge.points.add(new Point(x1 + 0, y1 + 2, false));
		edge.points.add(new Point(x1 + 1, y1 + 2, false));
		start.startEdges.add(edge);
		end.endEdges.add(edge);

		vertex.add(start);
		vertex.add(end);
	}
}