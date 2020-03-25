/*
* http://usejsdoc.org/
*/

import * as go from "gojs";
export class RLayout extends go.Layout {
   
        constructor() {
            super();
            this.isRealtime = true;
            this.isValidLayout=true;
            this.isRouting=true;
           
        }
        public doLayout(coll) {
            if (this.network === null) this.network = this.makeNetwork(coll);
            // assign LayoutVertex.bounds to all vertexes in the network:
            var vit = this.network.vertexes.iterator;
           
            while (vit.next()) {
              var v = vit.value;
              var node:go.Node=vit.value.node;
              node.findLinksConnected(null);
              var row:number=node.data.row
              var column:number=node.data.column
              
              v.centerX = column*100;
              v.centerY = row*100;
             
            }
            this.updateParts();
            this.network = null;
          }
}