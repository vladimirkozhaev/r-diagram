import * as go from "gojs";
import {FilterMethod} from './Types';

export class FoundNodesLinks {
    
    public static foundNodesWithColumnOrMore(myDiagram:go.Diagram,columnNum:number):Array<go.ObjectData>{
        var nodeDataArray:Array<go.ObjectData>=myDiagram.model.nodeDataArray;
    
        return nodeDataArray.filter(el=>{
            var node:go.Node=el as go.Node;
            
            return node.column>=columnNum
        })
    }
    
}