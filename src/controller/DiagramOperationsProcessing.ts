import * as go from "gojs";
import { FoundNodesLinks } from './../tools/FoundNodesLinks'
/*
* http://usejsdoc.org/
*/
export class DiagramOperationsProcessing {
    myDiagram: go.Diagram;
    nodeDataArray: Array<go.ObjectData>;
    linkModel: go.GraphLinksModel;

    constructor( myDiagram: go.Diagram, nodeDataArray: Array<go.ObjectData>, linkModel: go.GraphLinksModel ) {
        this.myDiagram = myDiagram;
        this.nodeDataArray = nodeDataArray;
        this.linkModel = linkModel;
    }

    public nodeClick( n: go.Node ) {
        if ( !n.findLinksOutOf( null ).hasNext() ) {
            var nodeName: string = "" + this.nodeDataArray.length

            this.myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", row: n.data.row, column: ( n.data.column + 1 ) } )

            this.linkModel.addLinkData( { from: n.key as string, to: nodeName } );
        }
    }

    public processAddTheNewLink( e: go.DiagramEvent ) {
        var link: go.Link = e.subject as go.Link
        var fromPort: go.Node = link.fromPort as go.Node;
        var toPort: go.Node = link.toPort as go.Node;

        if ( fromPort.data.column != toPort.data.column ) {

            fromPort=FoundNodesLinks.foundNodeColumnWithLastRow(this.myDiagram, fromPort.data.column)
            toPort=FoundNodesLinks.foundNodeColumnWithLastRow(this.myDiagram, toPort.data.column)
           
            var nodes: go.Iterator<go.Node> = fromPort.findNodesOutOf( null );


            var maxRow: number = 0;

            while ( nodes.next() ) {
                var outOfNode: go.Node = nodes.value;
                var row: number = outOfNode.data.row;
                maxRow = Math.max( row, maxRow )
            }

            nodes = toPort.findNodesInto( null )



            while ( nodes.next() ) {
                var outOfNode: go.Node = nodes.value;
                var row: number = outOfNode.data.row;
                maxRow = Math.max( row, maxRow )
            }




            var fromPortRow: number = fromPort.data.row as number;
            var toPortRow: number = toPort.data.row as number;
            var fromPortColumn: number = fromPort.data.column as number;
            var toPortColumn: number = toPort.data.column as number;

            var firstName: string = "" + this.nodeDataArray.length
            var secondName: string = "" + ( this.nodeDataArray.length + 1 )

            this.myDiagram.model.addNodeData( { key: "" + firstName, color: "lightblue", column: fromPortColumn, row: ( maxRow + 1 ) } )
            this.myDiagram.model.addNodeData( { key: "" + secondName, color: "lightblue", column: toPortColumn, row: ( maxRow + 1 ) } )

            this.linkModel.addLinkData( { from: fromPort.key as string, to: firstName } );
            this.linkModel.addLinkData( { from: firstName, to: secondName } );
            this.linkModel.addLinkData( { from: secondName, to: toPort.key as string } );
        }

        this.myDiagram.remove( link )

    }

    public clickOnLink( l: go.Link ) {

        var from = l.fromNode;
        var to = l.toNode;

        var nodeName: string = "" + this.nodeDataArray.length;
        var row: number = from.data.row;
        var column: number = to.data.column
        var links = FoundNodesLinks.foundNodesWithColumnOrMore( this.myDiagram, column )
        links.forEach( node => node.data.column = node.data.column + 1 )


        this.myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", row: row, column: column } )

        this.linkModel.addLinkData( { from: from.key as string, to: nodeName } );
        this.linkModel.addLinkData( { from: nodeName as string, to: to.key } );
        this.myDiagram.remove( l )

    }
}
