import * as go from "gojs";
//import * as LinkLabelOnPathDraggingTool from './LinkLabelOnPathDraggingTool.js'



window.addEventListener( "load", delay );

function delay() {




    var $ = go.GraphObject.make;  // for conciseness in defining templates

    var myDiagram = $( go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
        layout: $(go.TreeLayout,
                { angle: 0, nodeSpacing: 10, layerSpacing: 30 }),
            "undoManager.isEnabled": true  // enable undo & redo
        } );

    // define a simple Node template
    myDiagram.nodeTemplate =
        $( go.Node, "Auto",  // the Shape will go around the TextBlock
               
            $( go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },

                // Shape.fill is bound to Node.data.color
                new go.Binding( "fill", "color" ) ),
            $( go.TextBlock,
                { margin: 8, font: "bold 14px sans-serif", stroke: '#333' }, // Specify a margin to add some room around the text
                // TextBlock.text is bound to Node.data.key
                new go.Binding( "text", "key" ) ),
                

        );

    myDiagram.linkTemplate =
        $( go.Link,
            $( go.Shape ),  // the link shape
            $( go.Shape,   // the arrowhead
                { toArrow: "OpenTriangle", fill: null } ),
            {
              
                click:(e,link)=>{
                  var l:go.Link = link as go.Link;
                  var from=l.fromNode;
                  var to=l.toNode;
                  var nodeName:string=""+nodeDataArray.length
                 
                  myDiagram.model.addNodeData({key:""+nodeName,color:"lightblue"})
                 
                  linkModel.addLinkData({from:from.key as string,to:nodeName});
                  linkModel.addLinkData({from:nodeName as string,to:to.key});
                  myDiagram.remove(l)
                }
            }
        );

    // but use the default Link template, by not setting Diagram.linkTemplate
    var nodeDataArray=[{ key: "Alpha", color: "lightblue" },
    { key: "Beta", color: "orange" }]
    var nodeLinkArray=[
                       { from: "Alpha", to: "Beta" }
                       
                   ] ;
    // create the model data that will be represented by Nodes and Links
    
    var linkModel:go.GraphLinksModel=new go.GraphLinksModel(
            nodeDataArray,
            nodeLinkArray );
    myDiagram.model = linkModel;

}

