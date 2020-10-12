import * as joint from 'jointjs';
import * as B from 'Backbone';
import { Vertex } from './../model/Vertex';
import { GraphModel } from './../model/GraphModel';
import { EntryView } from "./EntryView";

window.onload = () => delay();

function delay() {

	
//	var graph = new joint.dia.Graph;
//
//	var paper = new joint.dia.Paper({
//		el: document.getElementById('paper-custom-elements'),
//		model: graph,
//		width: 600,
//		height: 300,
//		gridSize: 10,
//		drawGrid: true,
//		background: {
//			color: 'rgba(255, 165, 0, 0.3)'
//		}
//	});
//
//	paper.on('cell:pointerdown',
//		function(cellView, evt, x, y) {
//			alert('cell view ' + cellView.model.id + ' was clicked');
//		}
//	)
//
//
//	var graphModel: GraphModel = GraphModel.createTestModel()
//	
//	graphModel.vertex.forEach(v => {
//		var source: joint.shapes.standard.Ellipse = new joint.shapes.standard.Ellipse();
//		source.position(v.point.x, v.point.y);
//		source.resize(60, 60);
//		source.attr({
//			body: {
//				fill: 'white',
//				stroke: 'black',
//				strokeWidth: 2
//			},
//			label: {
//				text: 'Hello',
//				fill: 'black'
//			}
//		});
//		source.addTo(graph);
//
//	});
//
//
//	var verticesTool = new joint.linkTools.Vertices();
//	var segmentsTool = new joint.linkTools.Segments();
//	var boundaryTool = new joint.linkTools.Boundary();
//
//	var toolsView = new joint.dia.ToolsView({
//		tools: [verticesTool, segmentsTool, boundaryTool]
//	});



new EntryView({
  el: "#demo"
});
	

}


