import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex';
import { GraphModel } from './../model/GraphModel';
import { VertexView } from './VertexView'
import {Point} from "./../model/Point"

export class EntryView extends B.View<B.Model> {

	_graphModel: GraphModel;
	constructor(options?: B.ViewOptions<B.Model>) {
		super(options);
		

	}
	initialize() {
		var vertex:B.Collection<Vertex> = new B.Collection<Vertex>()
		vertex.add(new Vertex(new Point(0,0,true)))
		vertex.add(new Vertex(new Point(100,0,true)))
		this._graphModel = new GraphModel(vertex);
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
		//var gmodel=GraphModel.createTestModel();
		var vertex=this._graphModel.vertex;
		alert("vertex:"+vertex)
		vertex.forEach(v => {
			var source: VertexView = new VertexView(v);
//			source.position(v.point.x, v.point.y);
//			source.resize(60, 60);
//			source.attr({
//				body: {
//					fill: 'white',
//					stroke: 'black',
//					strokeWidth: 2
//				},
//				label: {
//					text: 'Hello',
//					fill: 'black'
//				}
//			})
			source.initialize()
				
			source.addTo(graph);

		})

		//		.forEach(v=>{
		//			v._startEdges.forEach(e=>{
		//				e._starVertex._point;		
		//			})
		//		});


		var verticesTool = new joint.linkTools.Vertices();
		var segmentsTool = new joint.linkTools.Segments();
		var boundaryTool = new joint.linkTools.Boundary();

		var toolsView = new joint.dia.ToolsView({
			tools: [verticesTool, segmentsTool, boundaryTool]
		});


		return this;
	}
}