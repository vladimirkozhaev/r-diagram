
/*
* http://usejsdoc.org/
*/
import * as joint from 'jointjs';
import { LinkModel } from "./../model/LinkModel"

export class MyLink extends joint.shapes.standard.Link {
	_linkModel: LinkModel;
	constructor(lm: LinkModel) {
		super()
		this._linkModel = lm
		
		if (this._linkModel.points.size() > 0) {
			this.updateVertices();

		}
		
		this._linkModel.points.forEach(p => {
           p.on("x:changed",p=>this.updateVertices())
			p.on("y:changed",p=>this.updateVertices())
        })
	}

    private updateVertices() {
        var vertices = [];
        this._linkModel.points.forEach(p => {
            vertices.push({ x: p.x * 100 + 205, y: p.y * 100 + 200 });
        });
        this.vertices(vertices);
    }

    

	

	public get linkModel(): LinkModel {
		return this._linkModel
	}


}