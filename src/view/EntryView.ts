import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex';
import { GraphModel } from './../model/GraphModel';
import { VertexView } from './VertexView'
import { Point } from "./../model/Point"
import * as Collections from 'typescript-collections';

export class EntryView extends B.View<B.Model> {

	_graphModel: GraphModel;
	_vertexDictionary:Collections.Dictionary<Vertex,VertexView>;
	constructor(options?: B.ViewOptions<B.Model>) {
		super(options);


	}
	
	initialize() {
		
		this._graphModel = GraphModel.createTestModel();
		this.render();
	}
	render() {

		var graph = new joint.dia.Graph;

		var paper = new joint.dia.Paper({
			el: document.getElementById('paper-custom-elements'),
			model: graph,
			width: 600,
			height: 300,
			gridSize: 10,
			drawGrid: true,
			background: {
				color: 'rgba(255, 165, 0, 0.3)'
			}
		});

		paper.on('cell:pointerdown',
			function(cellView, evt, x, y) {
				alert('cell view ' + cellView.model.id + ' was clicked');
			}
		)
		var vertex = this._graphModel.vertex;
		this._vertexDictionary=new Collections.Dictionary();
		vertex.forEach(v => {
			var source: VertexView = new VertexView(v);
			
			this._vertexDictionary.setValue(v,source)
			source.addTo(graph);

		}).forEach(v => {
				alert("add  edges"+v.startEdges.size()+" >>>"+v.endEdges.size())
				v.startEdges.forEach(e => {
				var link:joint.shapes.standard.Link = new joint.shapes.standard.Link();
				var source:VertexView=this._vertexDictionary.getValue(v)
				link.source(source);
				var target:VertexView=this._vertexDictionary.getValue(e.endVertex)
				link.target(target)
				link.addTo(graph)
				
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