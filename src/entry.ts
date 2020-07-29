
import * as joint from 'jointjs';



window.addEventListener("load", delay);

function delay() {

    // <script src="./output/entry.js" />


    var graph = new joint.dia.Graph;

    var paper: joint.dia.Paper = new joint.dia.Paper({
        el: document.getElementById('myholder'),
        model: graph,
        width: 600,
        height: 100,
        gridSize: 1
    });


paper.on('cell:pointerdblclick', function(cellView) {
    var isElement = cellView.model.isElement();
    var message = (isElement ? 'Element' : 'Link') + ' clicked';
    info.attr('label/text', message);

    info.attr('body/visibility', 'visible');
    info.attr('label/visibility', 'visible');
});

 
//	clientMatrix('cell:pointerclick', function (cellView) {
//        alert("Hello")
//    });

    var rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'Hello',
            fill: 'white'
        }
    });
    rect.addTo(graph);

    var rect2 = rect.clone();
  
	
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);

    var link = new joint.shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(graph);
	

}


