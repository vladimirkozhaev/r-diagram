import * as go from "gojs";
import { RLayout } from './RLayout';
import { DiagramOperationsProcessing } from './controller/DiagramOperationsProcessing'



window.addEventListener( "load", delay );

function delay() {




    var $ = go.GraphObject.make;  // for conciseness in defining templates

    var diagramProcessing: DiagramOperationsProcessing;

    var myDiagram = $( go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $( RLayout ),



            "undoManager.isEnabled": true  // enable undo & redo
        } );


    // define a simple Node template
    myDiagram.nodeTemplate =
        $( go.Node, "Auto",  // the Shape will go around the TextBlock

            $( go.Shape, "Circle", { strokeWidth: 0, fill: "white", desiredSize: new go.Size( 20, 20 ) },

                // Shape.fill is bound to Node.data.color
                new go.Binding( "fill", "color" ) ),
            $( go.Panel, "Table",
                $( go.RowColumnDefinition,
                    { column: 0, alignment: go.Spot.Center } ),
                $( go.RowColumnDefinition,
                    { column: 1, alignment: go.Spot.Center } ),
                $( go.RowColumnDefinition,
                    { column: 2, alignment: go.Spot.Center } ),

                $( go.Panel, "Horizontal",
                    { column: 0, row: 0 },
                    $( go.Shape,  // the "A" port
                        {
                            width: 10, height: 10, portId: "A", toSpot: go.Spot.Right,
                            fromLinkable: true, toMaxLinks: 1, toLinkable: true,
                        } ),  // allow user-drawn links from here

                ),
                $( go.TextBlock, "Click",
                    {

                        column: 0, row: 1,
                        click: function( e, node ) {
                            diagramProcessing.nodeClick( node.panel.panel as go.Node )


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
                    diagramProcessing.clickOnLink( link as go.Link )
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

    diagramProcessing = new DiagramOperationsProcessing( myDiagram, nodeDataArray, linkModel )
    myDiagram.addDiagramListener( "LinkDrawn", ( e: go.DiagramEvent ) => diagramProcessing.processAddTheNewLink( e ) );

}


