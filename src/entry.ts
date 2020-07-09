
import { RLayout } from './RLayout';
import { DiagramOperationsProcessing } from './controller/DiagramOperationsProcessing'
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




    paper.on('cell:pointerclick', function (cellView) {
        alert("Hello")
    });

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
    rect2.translate(300, 0);
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);

    var link = new joint.shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(graph);

}


