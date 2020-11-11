
/*
* http://usejsdoc.org/
*/
import * as joint from 'jointjs';
import { LinkModel } from "./../model/LinkModel"
import * as Consts from './Consts'

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
            vertices.push({ x: p.x * Consts.LINK_DISTANCE + Consts.X_SHIFT+Consts.VERTEX_VIEW_RADIUS/2, y: p.y * Consts.LINK_DISTANCE + Consts.Y_SHIFT+Consts.VERTEX_VIEW_RADIUS/2 });
        });
        this.vertices(vertices);
    }

    

	

	public get linkModel(): LinkModel {
		return this._linkModel
	}


}