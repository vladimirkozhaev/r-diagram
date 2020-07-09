import * as go from "gojs";
import { FilterMethod } from './Types';

export class NodesUtil {

    myDiagram: go.Diagram;


    constructor( myDiagram: go.Diagram ) {
        this.myDiagram = myDiagram;
    }


    public doesLineIntersectNodesOrHorizontalRow( startC:number, endC:number, row:number ): boolean {
        var isLineIntersectNode:boolean=( endC - startC > 2 ) && ( this.isLineIntersectNode( startC, endC, row ) );
        var isLineIntersectEdges:boolean=this.isLineIntersectEdges( startC, endC, row )
       
        return isLineIntersectNode || isLineIntersectEdges;

    }

    public createOrGetConnectionNode( columnNum: number, rowNum: number ): go.Node {
        // item 55
        var newNodeOnEndColumn: go.Node = this.myDiagram.nodes.filter( node => this.getDataOrObject(node)["row"] == rowNum && this.getDataOrObject(node)["column"] == columnNum ).first()

        if ( newNodeOnEndColumn != null ) {

            return newNodeOnEndColumn
        }
        // item 56
        newNodeOnEndColumn = this.createNode( columnNum, rowNum )
        // item 57
        var nodeToConnect = this.foundLastNodeOnTheColumn( columnNum )
        // item 58
       
        this.connectNodes( nodeToConnect, newNodeOnEndColumn )


        return newNodeOnEndColumn
    }

    public processDragNDrop( startColumn: number, startRow: number, endColumn: number, endRow: number ) {

        if ( endColumn > startColumn ) {

            // item 27
            var startR = startRow
            var endR = endRow
            var startC = startColumn
            var endC = endColumn

            do {
                // item 29
                startR++


            } while (  this.doesLineIntersectNodesOrHorizontalRow( startC, endC, startR ) )

           
            // item 37

            var startNode = this.createOrGetConnectionNode( startC, startR )
            // item 63
            var endNode = this.createOrGetConnectionNode( endC, startR )
            // item 64
            this.connectNodes( startNode, endNode )
        }
    }


    public connectNodes( nodeToConnect: go.Node, newNode: go.Node ): void {

        var startNodeKey: string = "" + nodeToConnect.data.key;
        var endNodeKey: string = "" + newNode.data.key;

        ( this.myDiagram.model as go.GraphLinksModel ).addLinkData( { from: startNodeKey, to: endNodeKey } );
    }

    public createNode( columnNum: number, rowNum: number ): go.Node {
        var nodeName: string = "" + ( this.myDiagram.nodes.count + 1 );
        this.myDiagram.model.addNodeData( { key: "" + nodeName, color: "lightblue", row: rowNum, column: columnNum } )
        return this.myDiagram.findNodeForKey( nodeName );
    }

    public foundLastNodeOnTheColumn( columnNum: number ): go.Node {

        var sortedObject = this.myDiagram.nodes.filter( n => {

            return this.getDataOrObject( n )["column"] == columnNum;
        }
        )

        var l = new go.List( sortedObject )
        var lastNode: go.Node = l.sort(( a: go.Node, b: go.Node ) => this.getDataOrObject( b )["row"] - this.getDataOrObject( a )["row"] ).first();
        alert("last node to the column:("+this.getDataOrObject( lastNode )["column"]+","+this.getDataOrObject( lastNode )["row"]+") node size:"+l.size)
        return lastNode;

    }


    public getDataOrObject( n ): go.Node | Object {
        return ( n.data != null ) ? n.data : n
    }

    public isLineIntersectEdges( startC: number, endC: number, row: number ): boolean {
        return this.myDiagram.links.filter(( l: go.Link ) => this.getDataOrObject(l.fromNode)["row"] == row && this.getDataOrObject(l.fromNode)["column"] == startC
            && this.getDataOrObject(l.toNode)["row"] == row && this.getDataOrObject(l.toNode)["column"] == endC ).count > 0;
    }
    public isLineIntersectNode( startC: number, endC: number, row: number ): boolean {
        return this.myDiagram.nodes.filter(( node: go.Node ) => this.getDataOrObject( node )["row"] == row && this.getDataOrObject( node )["column"] >= startC && this.getDataOrObject( node )["column"] <= endC ).count > 0
    }


    public foundNodesWithColumnOrMore( columnNum: number ): Array<go.Node> {
        var nodeDataArray: Array<go.ObjectData> = this.myDiagram.model.nodeDataArray;

        return nodeDataArray.filter( el => {
            var node: go.Node = el as go.Node;

            return node.column >= columnNum
        } ).map( nodeObj => this.myDiagram.findNodeForKey( nodeObj.key ) )
    }





    public foundEmptySectionColumn( startColumnNum: number, endColumnNum: number ): number {
        var rowNumber: number = -1
        var count: number = 0;
        var filter: Function;
        if ( endColumnNum - startColumnNum <= 1 ) {
            filter = n => this.getDataOrObject( n )["row"] == rowNumber
                && this.getDataOrObject( n )["column"] >= startColumnNum
                && this.getDataOrObject( n )["column"] <= endColumnNum && this.getDataOrObject( n )["key"] != undefined
        } else {
            filter = n => this.getDataOrObject( n )["row"] == rowNumber && this.getDataOrObject( n )["column"]
                > startColumnNum && this.getDataOrObject( n )["column"] < endColumnNum && this.getDataOrObject( n )["key"] != undefined
        }
        do {
            rowNumber++
            var nodeDataArray: Array<go.ObjectData> = this.myDiagram.model.nodeDataArray;


            var count = nodeDataArray.filter( n => filter( n ) ).length;


        } while ( count != 0 );

        return rowNumber;
    }

    public foundNodeWithCoumnAndRow( column: number, row: number ): Array<go.ObjectData> {
        var nodeDataArray: Array<go.ObjectData> = this.myDiagram.model.nodeDataArray;


        return nodeDataArray.filter( n => this.getDataOrObject( n )["row"] == row && this.getDataOrObject( n )["column"] == column );
    }


    public foundMaxRow( nodes: go.Iterator<go.Node> ): number {

        var maxRow: number = 0;

        while ( nodes.next() ) {
            var outOfNode: go.Node = nodes.value;
            var row: number = outOfNode.data.row;
            maxRow = Math.max( row, maxRow )
        }
        return maxRow;
    }
}   