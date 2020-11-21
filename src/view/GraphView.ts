import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex';
import { GraphModel } from './../model/GraphModel';
import { VertexView } from './VertexView'
import { Point } from "./../model/Point"
import { MyLink } from './MyLink'
import { LinkModel } from './../model/LinkModel'
import * as Consts from './Consts'

import * as Collections from 'typescript-collections';

export class GraphView extends B.View<B.Model> {

	_graphModel: GraphModel;
	_vertexDictionary: Collections.Dictionary<String, VertexView>;
	_vertexViewToStart: VertexView = null;

	constructor(options?: B.ViewOptions<B.Model>) {
		super(options);
	}

	public initialize() {
		this._graphModel = GraphModel.createTestModel();

		this.render();
	}

	public get vertexDictionary(): Collections.Dictionary<String, VertexView> {
		return this._vertexDictionary;
	}

	render() {

		var graph = new joint.dia.Graph;
		var vd = this._vertexDictionary
		var paper = new joint.dia.Paper({
			el: document.getElementById('paper-custom-elements'),
			model: graph,
			width: 1200,
			height: 800,
			gridSize: 10,
			drawGrid: true,
			background: {
				color: 'rgba(255, 165, 0, 0.3)'
			},




		});

		paper.on("link:pointerdblclick", (linkViewToClick, object, x, y) => {

			this.insertVertexToTheLink(linkViewToClick, x, y, graph);
		})

		paper.on('element:pointerdown', (elementView, evt) => {

			this._vertexViewToStart = elementView.model;

		})

		paper.on("blank:pointerup", () => {
			alert("blank:pointerup")
		})
		paper.on('element:pointerup', (elementView, evt, x, y) => {

			var vertexViews: VertexView[] = this._vertexDictionary.values();
			var sourceModel: Vertex = elementView.model.model;
			var sourceX: number = sourceModel.point.x;
			var sourceY: number = sourceModel.point.y;
			var posX: number = Math.round((x - Consts.X_SHIFT) / Consts.X_CELL_SIZE);
			var posY: number = Math.round((y - Consts.Y_SHIFT) / Consts.Y_CELL_SIZE);

			var vertexViewToEnd: VertexView = vertexViews.filter(vView => {
				var vertexView: VertexView = vView as VertexView;
				var targetVertex: Vertex = vertexView.model;
				var targetX: number = targetVertex.point.x;
				var targetY: number = targetVertex.point.y;

				

				return posX == targetX && posY == targetY
					&& (sourceX != targetX || sourceY != targetY);

			}).pop()

			if (this._vertexViewToStart != null && vertexViewToEnd != null) {
				vertexViewToEnd.setPositionToModelPoint();
				var freeY:number=this._graphModel.foundFreeHorizontal(sourceX,posX,posY,sourceModel.point.x<vertexViewToEnd.model.point.x)
				var points: Point[] = [new Point(sourceX, freeY, false), new Point(vertexViewToEnd.model.point.x, freeY, false)]
				var edgeToConnect: LinkModel = this.connectVertex(this._vertexViewToStart.model, vertexViewToEnd.model, points)
				var leftEdgeView: MyLink = this.addLinkView(edgeToConnect, this._vertexViewToStart, vertexViewToEnd, graph)



			}
			this.setPositionToModelPointForAll()

			this._vertexViewToStart = null;

		}
		)


		var vertex = this._graphModel.vertex;
		this._vertexDictionary = new Collections.Dictionary();
		vertex.forEach(v => {
			this.addVertexView(v, graph);

		}).forEach(v => {

			v.startEdges.forEach(e => {
				this.addEdgeOfVertex(v, e, graph);

			})
		});


		var verticesTool = new joint.linkTools.Vertices();
		var segmentsTool = new joint.linkTools.Segments();
		var boundaryTool = new joint.linkTools.Boundary();

		var toolsView = new joint.dia.ToolsView({
			tools: [verticesTool, segmentsTool, boundaryTool]
		});


		return this;
	}
	private setPositionToModelPointForAll() {
		this._vertexDictionary.forEach((key, value) => {
			value.setPositionToModelPoint()
		})
	}
	private addEdgeOfVertex(v: Vertex, e: LinkModel, graph: joint.dia.Graph) {
		var startVertex: Vertex = v;
		var endVertex: Vertex = e.endVertex;
		var source: VertexView = this._vertexDictionary.getValue(v.cid);
		var target: VertexView = this._vertexDictionary.getValue(e.endVertex.cid);
		this.addLinkView(e, source, target, graph);
	}

	private addVertexView(v: Vertex, graph: joint.dia.Graph): VertexView {
		var source: VertexView = new VertexView(v);
		this._vertexDictionary.setValue(v.cid, source);
		source.addTo(graph);
		return source;
	}

	private insertVertexToTheLink(linkViewToClick: any, x: number, y: number, graph: joint.dia.Graph) {


		var linkModel: LinkModel = linkViewToClick.model.linkModel;


		var startVertex: Vertex = linkModel.startVertex;
		var endVertex: Vertex = linkModel.endVertex;

		var leftToRight: boolean = endVertex.point.x - startVertex.point.x > 0


		var startVertexView: VertexView = this._vertexDictionary.getValue(startVertex.cid);
		var endVertexView: VertexView = this._vertexDictionary.getValue(endVertex.cid);

		var xToMove: number = Math.min(startVertex.point.x, endVertex.point.x)

		this.movePointToRightFromX(xToMove);

		var pointsToLeft: Point[] = linkModel.points.filter(p => p.x <= xToMove)

		var pointsToRight: Point[] = linkModel.points.filter(p => p.x > xToMove)

		var pointY: number = Math.floor((y - Consts.Y_SHIFT) / Consts.Y_CELL_SIZE)

		var vertexToAdd: Vertex = new Vertex(new Point(xToMove + 1, pointY, true));
		this._graphModel.addVertex(vertexToAdd)

		var rightEdge = this.connectVertex(vertexToAdd, endVertex, leftToRight ? pointsToRight : pointsToLeft)
		var vertexViewToAdd: VertexView = this.addVertexView(vertexToAdd, graph)

		var leftEdge = this.connectVertex(startVertex, vertexToAdd, leftToRight ? pointsToLeft : pointsToRight);


		var leftEdgeView: MyLink = this.addLinkView(leftEdge, startVertexView, vertexViewToAdd, graph)
		var rightEdgeView: MyLink = this.addLinkView(rightEdge, vertexViewToAdd, endVertexView, graph)


		linkViewToClick.remove();
	}

	private movePointToRightFromX(x: number) {
		this._graphModel.points.filter(point => { return point.x > x; }).forEach(p => {
			p.x += 1;
		});
	}

	private connectVertex(startVertex: Vertex, endVertex: Vertex, points: Point[]): LinkModel {
		var link = new LinkModel();
		startVertex.startEdges.add(link);
		endVertex.endEdges.add(link);
		link.startVertex = startVertex
		link.endVertex = endVertex;
		link.points = new B.Collection<Point>(points);
		return link;
	}

	private addLinkView(e: LinkModel, source: VertexView, target: VertexView, graph: joint.dia.Graph) {
		var linkView: MyLink = new MyLink(e);
		linkView.source(source);
		linkView.target(target);
		linkView.addTo(graph);
		return linkView;
	}
}