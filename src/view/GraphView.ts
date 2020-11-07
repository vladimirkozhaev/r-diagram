import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex';
import { GraphModel } from './../model/GraphModel';
import { VertexView } from './VertexView'
import { Point } from "./../model/Point"
import { MyLink } from './MyLink'
import { LinkModel } from './../model/LinkModel'

import * as Collections from 'typescript-collections';

export class GraphView extends B.View<B.Model> {

	_graphModel: GraphModel;
	_vertexDictionary: Collections.Dictionary<String, VertexView>;

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

		paper.on("link:pointerdblclick", (linkViewToClick,object,x,y) => {
			
			this.insertVertexToTheLink(linkViewToClick,x,y, graph);
		})

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

	private insertVertexToTheLink(linkViewToClick: any,x:number,y:number, graph: joint.dia.Graph) {
		
		
		var linkModel: LinkModel = linkViewToClick.model.linkModel;
		var startVertex: Vertex = linkModel.startVertex;
		var endVertex: Vertex = linkModel.endVertex;
		var startVertexView: VertexView = this._vertexDictionary.getValue(startVertex.cid);
		var endVertexView: VertexView = this._vertexDictionary.getValue(endVertex.cid);
		
		this.movePointToRightFromX(startVertex.point.x);

		var pointsToLeft:Point[]=linkModel.points.filter(p=>p.x<=startVertex.point.x)
		
		var pointsToRight:Point[]=linkModel.points.filter(p=>p.x>startVertex.point.x)
		
		var pointY:number=Math.floor((y-200)/100)
		
		var vertexToAdd: Vertex = new Vertex(new Point(startVertex.point.x + 1, pointY, true));
		this._graphModel.addVertex(vertexToAdd)
		
		var rightEdge=this.connectVertex(vertexToAdd,endVertex,pointsToRight)
		var vertexViewToAdd: VertexView = this.addVertexView(vertexToAdd, graph)

		var leftEdge = this.connectVertex(startVertex, vertexToAdd,pointsToLeft);

		
		var leftEdgeView: MyLink = this.addLinkView(leftEdge, startVertexView, vertexViewToAdd, graph)
		var rightEdgeView: MyLink = this.addLinkView(rightEdge, vertexViewToAdd, endVertexView, graph)

		
		linkViewToClick.remove();
	}

	private movePointToRightFromX(x:number) {
		this._graphModel.points.filter(point => { return point.x > x; }).forEach(p => {
			p.x += 1;
		});
	}

	private connectVertex(startVertex: Vertex, endVertex: Vertex,points:Point[]) {
		var link = new LinkModel();
		startVertex.startEdges.add(link);
		endVertex.endEdges.add(link);
		link.startVertex=startVertex
		link.endVertex=endVertex;
		link.points=new B.Collection<Point>(points);
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