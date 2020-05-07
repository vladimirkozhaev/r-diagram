import * as go from "gojs";
import { NodesUtil } from './../tools/NodesUtil'
/*
* http://usejsdoc.org/
*/
export class DiagramOperationsProcessing {
    myDiagram: go.Diagram;
    nodeDataArray: Array<go.ObjectData>;
    linkModel: go.GraphLinksModel;
    nodesUtil:NodesUtil
    constructor( myDiagram: go.Diagram, nodeDataArray: Array<go.ObjectData>, linkModel: go.GraphLinksModel ) {
        this.myDiagram = myDiagram;
        this.nodeDataArray = nodeDataArray;
        this.linkModel = linkModel;
        this.nodesUtil=new NodesUtil(this.myDiagram)
    }

    public nodeClick( n: go.Node ) {
        if ( !n.findLinksOutOf( null ).hasNext() ) {
            var nodeName: string = "" + this.nodeDataArray.length

            this.myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", row: n.data.row, column: ( n.data.column + 1 ) } )

            this.linkModel.addLinkData( { from: n.key as string, to: nodeName } );
        }
    }

    
    /**
     * Add the new link between nodes
     * @param e
     */
    public processAddTheNewLink( e: go.DiagramEvent ) {
        var link: go.Link = e.subject as go.Link
        var fromPort: go.Node = link.fromPort as go.Node;
        var toPort: go.Node = link.toPort as go.Node;
        var startColumn=fromPort.data.column;
        var startRow=fromPort.data.row
        var endColumn=toPort.data.column
        var endRow=toPort.data.row
        this.nodesUtil.processDragNDrop(startColumn, startRow, endColumn, endRow);
        

        this.myDiagram.remove( link )

    }

    public clickOnLink( l: go.Link ) {

        var from = l.fromNode;
        var to = l.toNode;

        var row: number = from.data.row;
        var column: number = to.data.column
        
        var links = this.nodesUtil.foundNodesWithColumnOrMore( column )
        links.forEach( node => node.data.column = node.data.column + 1 )


        var nodeName: string = "" + this.nodeDataArray.length;
        this.myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", row: row, column: column } )

        this.linkModel.addLinkData( { from: from.key as string, to: nodeName } );
        this.linkModel.addLinkData( { from: nodeName as string, to: to.key } );
        this.myDiagram.remove( l )

    }
}
