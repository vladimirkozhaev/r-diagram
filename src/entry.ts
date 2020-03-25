import * as go from "gojs";
import * as figures from './Figures';
import { MultiArrowLink } from './MultiArrowLink'
import { ParallelLayout } from './ParallelLayout'
import { ParallelRouteLink } from './ParallelRouteLink';
import { RLayout } from './RLayout';



window.addEventListener( "load", delay );

function delay() {




    var $ = go.GraphObject.make;  // for conciseness in defining templates

    var myDiagram = $( go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $( RLayout ),



            "undoManager.isEnabled": true  // enable undo & redo
        } );

    myDiagram.addDiagramListener( "LinkDrawn", function( e: go.DiagramEvent ) {
        var link: go.Link = e.subject as go.Link
        var fromPort: go.Node = link.fromPort as go.Node;
        var toPort: go.Node = link.toPort as go.Node;




        var nodes: go.Iterator<go.Node> = fromPort.findNodesOutOf( null );


        var maxRow: number = 0;

        while ( nodes.next() ) {
            var outOfNode:go.Node = nodes.value;
            var row: number = outOfNode.data.row;
            maxRow = Math.max( row, maxRow )
        }

        nodes = toPort.findNodesInto( null )



        while ( nodes.next() ) {
            var outOfNode:go.Node = nodes.value;
            var row: number = outOfNode.data.row;
            maxRow = Math.max( row, maxRow )
        }




        var fromPortRow: number = fromPort.data.row as number;
        var toPortRow: number = toPort.data.row as number;
        var fromPortColumn: number = fromPort.data.column as number;
        var toPortColumn: number = toPort.data.column as number;

        var firstName: string = "" + nodeDataArray.length
        var secondName: string = "" + ( nodeDataArray.length + 1 )

        myDiagram.model.addNodeData( { key: "" + firstName, color: "lightblue", column: fromPortColumn, row: ( maxRow + 1 ) } )
        myDiagram.model.addNodeData( { key: "" + secondName, color: "lightblue", column: toPortColumn, row: ( maxRow + 1 ) } )

        linkModel.addLinkData( { from: fromPort.key as string, to: firstName } );
        linkModel.addLinkData( { from: firstName, to: secondName } );
        linkModel.addLinkData( { from: secondName, to: toPort.key as string } );

        myDiagram.remove( link )



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

}


