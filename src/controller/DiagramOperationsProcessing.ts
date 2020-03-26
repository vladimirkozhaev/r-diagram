import * as go from "gojs";

/*
* http://usejsdoc.org/
*/
export class DiagramOperationsProcessing {
    myDiagram: go.Diagram;
    nodeDataArray: Array<go.ObjectData>;
    linkModel: go.GraphLinksModel;

    constructor( myDiagram: go.Diagram, nodeDataArray: Array<go.ObjectData> , linkModel: go.GraphLinksModel ) {
        this.myDiagram = myDiagram;
        this.nodeDataArray = nodeDataArray;
        this.linkModel = linkModel;
    }

    public processAddTheNewLink( e: go.DiagramEvent ) {
        var link: go.Link = e.subject as go.Link
        var fromPort: go.Node = link.fromPort as go.Node;
        var toPort: go.Node = link.toPort as go.Node;




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

        this.myDiagram.remove( link )

    }
}