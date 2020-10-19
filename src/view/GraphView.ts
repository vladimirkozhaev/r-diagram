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
	_vertexDictionary: Collections.Dictionary<Vertex, VertexView>;

	constructor(options?: B.ViewOptions<B.Model>) {
		super(options);
	}

	initialize() {
		this._graphModel = GraphModel.createTestModel();
		this.render();
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
			//			linkView: joint.dia.LinkView.extend({
			//				pointerclick: function(evt: joint.dia.Event, x, y) {
			//					var linkView:MyLink = this.model as MyLink
			//				
			//					var linkModel: LinkModel = linkView.linkModel
			//					var startVertex: Vertex = linkModel.startVertex
			//					var endVertex: Vertex = linkModel.endVertex
			//
			//					var startVertexView: VertexView = vd.getValue(startVertex)
			//					var endVertexView: VertexView = vd.getValue(startVertex)
			//					
			//					this.model.remove();
			//				}
			//			}),



		});

		paper.on("link:pointerdblclick", linkView => {


			var linkModel: LinkModel = linkView.model.linkModel
			var startVertex: Vertex = linkModel.startVertex
			var endVertex: Vertex = linkModel.endVertex

			var startVertexView: VertexView = this._vertexDictionary.getValue(startVertex)
			var endVertexView: VertexView = this._vertexDictionary.getValue(startVertex)
			alert("startVertexView:"+startVertexView+", endVertexView:"+endVertexView)
			linkView.remove();
		})

		var vertex = this._graphModel.vertex;
		this._vertexDictionary = new Collections.Dictionary();
		vertex.forEach(v => {
			var source: VertexView = new VertexView(v);

			this._vertexDictionary.setValue(v, source)
			source.addTo(graph);

		}).forEach(v => {

			v.startEdges.forEach(e => {
				var linkView: MyLink = new MyLink(e);

				var source: VertexView = this._vertexDictionary.getValue(v)
				linkView.source(source);

				var target: VertexView = this._vertexDictionary.getValue(e.endVertex)
				linkView.target(target)



				if (e.points.size() > 0) {
					var vertices = []
					//vertices.push({ x: v.point.x*100+200, y: v.point.y*100+200 })

					e.points.forEach(p => {


						vertices.push({ x: p.x * 100 + 205, y: p.y * 100 + 200 });

					})


					//vertices.push({ x: e.endVertex.point.x*100+200, y: e.endVertex.point.y*100+200 })


					linkView.vertices(vertices);

				}


				linkView.addTo(graph)

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
}