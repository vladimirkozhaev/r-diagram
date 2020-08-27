import * as joint from 'jointjs';


window.onload = () => delay();

function delay() {

	alert("Create the graph")
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
        function (cellView, evt, x, y) {
            alert('cell view ' + cellView.model.id + ' was clicked');
        }
    );
    var source = new joint.shapes.standard.Rectangle();
    source.position(40, 40);
    source.resize(120, 60);
    source.attr({
        body: {
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2
        },
        label: {
            text: 'Hello',
            fill: 'black'
        }
    });
    source.addTo(graph);

    var target = new joint.shapes.standard.Ellipse();
    target.position(440, 200);
    target.resize(120, 60);
    target.attr({
        body: {
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            rx: 60,
            ry: 30,
        },
        label: {
            text: 'World!',
            fill: 'black'
        }
    });
    target.addTo(graph);

    var link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target, {
        connectionPoint: {
            name: 'boundary'
        }
    });
    link.vertices([
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 200 }
    ]);
    link.addTo(graph);

    var verticesTool = new joint.linkTools.Vertices();
    var segmentsTool = new joint.linkTools.Segments();
    var boundaryTool = new joint.linkTools.Boundary();

    var toolsView = new joint.dia.ToolsView({
        tools: [verticesTool, segmentsTool, boundaryTool]
    });

    var linkView = link.findView(paper);
    linkView.addTools(toolsView);
    linkView.hideTools();

    paper.on('link:mouseenter', function (linkView) {
        linkView.showTools();
    });

    paper.on('link:mouseleave', function (linkView) {
        linkView.hideTools();
    });

}


