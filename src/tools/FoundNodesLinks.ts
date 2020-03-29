import * as go from "gojs";
import {FilterMethod} from './Types';

export class FoundNodesLinks {
    
    public static foundNodesWithColumnOrMore(myDiagram:go.Diagram,columnNum:number):Array<go.Node>{
        var nodeDataArray:Array<go.ObjectData>=myDiagram.model.nodeDataArray;
    
        return nodeDataArray.filter(el=>{
            var node:go.Node=el as go.Node;
            
            return node.column>=columnNum
        }).map(nodeObj=>myDiagram.findNodeForKey(nodeObj.key))
    }
    
    
    public static foundNodeColumnWithLastRow(myDiagram:go.Diagram,columnNum:number):go.Node{
        var nodeDataArray:Array<go.ObjectData>=myDiagram.model.nodeDataArray;
        
        return nodeDataArray.filter(el=>{
            var node:go.Node=el as go.Node;
            
            return node.column>=columnNum
        }).sort((a,b)=>b.row-a.row).map(nodeObj=>myDiagram.findNodeForKey(nodeObj.key))[0] as go.Node;
    }
}   