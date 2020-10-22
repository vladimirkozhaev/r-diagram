
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
		this._linkModel.on("change", e => { alert("change link model") })

		if (this._linkModel.points.size() > 0) {
			var vertices = []

			this._linkModel.points.forEach(p => {


				vertices.push({ x: p.x * 100 + 205, y: p.y * 100 + 200 });

			})
			
			this.vertices(vertices);

		}

	}

	protected pointerclick(evt: joint.dia.Event, x: number, y: number) {
		alert("click")
	}

	public get linkModel(): LinkModel {
		return this._linkModel
	}


}