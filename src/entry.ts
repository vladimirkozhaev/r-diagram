import * as go from "gojs";
import * as figures from './Figures';
import { MultiArrowLink } from './MultiArrowLink'
import { ParallelLayout } from './ParallelLayout'
import { ParallelRouteLink } from './ParallelRouteLink';
import { RLayout } from './RLayout';
import {DiagramOperationsProcessing} from './controller/DiagramOperationsProcessing'



window.addEventListener( "load", delay );

function delay() {




    var $ = go.GraphObject.make;  // for conciseness in defining templates

    var diagramProcessing:DiagramOperationsProcessing;
    
    var myDiagram = $( go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $( RLayout ),



            "undoManager.isEnabled": true  // enable undo & redo
        } );


    // define a simple Node template
    myDiagram.nodeTemplate =
        $( go.Node, "Auto",  // the Shape will go around the TextBlock

            $( go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },

                // Shape.fill is bound to Node.data.color
                new go.Binding( "fill", "color" ) ),
            $( go.Panel, "Table",
                $( go.RowColumnDefinition,
                    { column: 0, alignment: go.Spot.Left } ),
                $( go.RowColumnDefinition,
                    { column: 1, alignment: go.Spot.Right } ),
                $( go.RowColumnDefinition,
                    { column: 2, alignment: go.Spot.Right } ),
                $( go.TextBlock,  // the node title
                    {
                        column: 0, row: 0, columnSpan: 3, alignment: go.Spot.Center,
                        font: "bold 10pt sans-serif", margin: new go.Margin( 4, 2 )
                    },
                    new go.Binding( "text", "key" ) ),
                $( go.Panel, "Horizontal",
                    { column: 0, row: 1 },
                    $( go.Shape,  // the "A" port
                        {
                            width: 6, height: 6, portId: "A", toSpot: go.Spot.Right,
                            fromLinkable: true, toMaxLinks: 1, toLinkable: true,
                        } ),  // allow user-drawn links from here
                    $( go.TextBlock, "In" )  // "A" port label
                ),
                $( go.TextBlock, "Click",
                    {
                        column: 0, row: 2,
                        click: function( e, node ) {

                            var n: go.Node = node.panel.panel as go.Node;
                            var nodeName: string = "" + nodeDataArray.length

                            myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", layer: "" + ( nodeDataArray.length + 1 ) } )

                            linkModel.addLinkData( { from: n.key as string, to: nodeName } );


                        }
                    }
                )


            ) );

    myDiagram.linkTemplate =
        $( go.Link,
            {
                relinkableFrom: true, relinkableTo: true,
                reshapable: true, resegmentable: true
            },
            { routing: go.Link.Orthogonal, corner: 5, reshapable: true },
            $( go.Shape ),  // the link shape
            $( go.Shape,   // the arrowhead
                { stroke: 'gray', strokeWidth: 1.5 },
                { toArrow: "OpenTriangle", fill: null } ),
            {

                click: ( e, link ) => {
                    var l: go.Link = link as go.Link;
                    var from = l.fromNode;
                    var to = l.toNode;
                    var sort: number = nodeDataArray.length;
                    var nodeName: string = "" + sort

                    myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", sort: sort } )

                    linkModel.addLinkData( { from: from.key as string, to: nodeName } );
                    linkModel.addLinkData( { from: nodeName as string, to: to.key } );
                    myDiagram.remove( l )
                }
            }
        );

    // but use the default Link template, by not setting Diagram.linkTemplate
    var nodeDataArray = [{ key: "start", color: "lightblue", row: 0, column: 0 },
    { key: "end", color: "lightblue", row: 0, column: 1 }]
    var nodeLinkArray = [
        { from: "start", to: "end" }

    ];
    // create the model data that will be represented by Nodes and Links

    var linkModel: go.GraphLinksModel = new go.GraphLinksModel(
        nodeDataArray,
        nodeLinkArray );
    myDiagram.model = linkModel;
    
    diagramProcessing=new DiagramOperationsProcessing(myDiagram,nodeDataArray,linkModel)
    myDiagram.addDiagramListener( "LinkDrawn", ( e: go.DiagramEvent ) =>diagramProcessing.processAddTheNewLink(e));

}


