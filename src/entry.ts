import * as go from "gojs";
//import * as LinkLabelOnPathDraggingTool from './LinkLabelOnPathDraggingTool.js'



window.addEventListener( "load", delay );

function delay() {




    var $ = go.GraphObject.make;  // for conciseness in defining templates

    var myDiagram = $( go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            layout: $( go.TreeLayout,
                { angle: 0, nodeSpacing: 10, layerSpacing: 30 } ),
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
                            fromLinkable: true, toMaxLinks: 1,toLinkable: true,
                        } ),  // allow user-drawn links from here
                    $( go.TextBlock, "In" )  // "A" port label
                ),
//                $( go.Panel, "Horizontal",
//                    { column: 1, row: 1 },
//                    $( go.Shape,  // the "B" port
//                        {
//                            width: 6, height: 6, portId: "B", toSpot: go.Spot.Left,
//                            toLinkable: true, toMaxLinks: 1
//                        } ),  // allow user-drawn links from here
//                    $( go.TextBlock, "B" )  // "B" port label
//                ),
//                $( go.Panel, "Horizontal",
//                    { column: 2, row: 1, rowSpan: 2 },
//                    $( go.TextBlock, "Out" ),  // "Out" port label
//                    $( go.Shape,  // the "Out" port
//                        {
//                            width: 6, height: 6, portId: "Out", fromSpot: go.Spot.Right,
//                            fromLinkable: true
//                        } )  // allow user-drawn links to here
//                )
            )


        );

    myDiagram.linkTemplate =
        $( go.Link,
            $( go.Shape ),  // the link shape
            $( go.Shape,   // the arrowhead
                { toArrow: "OpenTriangle", fill: null } ),
            {

                click: ( e, link ) => {
                    var l: go.Link = link as go.Link;
                    var from = l.fromNode;
                    var to = l.toNode;
                    var nodeName: string = "" + nodeDataArray.length

                    myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue" } )

                    linkModel.addLinkData( { from: from.key as string, to: nodeName } );
                    linkModel.addLinkData( { from: nodeName as string, to: to.key } );
                    myDiagram.remove( l )
                }
            }
        );

    // but use the default Link template, by not setting Diagram.linkTemplate
    var nodeDataArray = [{ key: "Alpha", color: "lightblue" },
    { key: "Beta", color: "orange" }]
    var nodeLinkArray = [
        { from: "Alpha", to: "Beta" }

    ];
    // create the model data that will be represented by Nodes and Links

    var linkModel: go.GraphLinksModel = new go.GraphLinksModel(
        nodeDataArray,
        nodeLinkArray );
    myDiagram.model = linkModel;

}


