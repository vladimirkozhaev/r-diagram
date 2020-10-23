/*
* http://usejsdoc.org/
*/

import * as joint from 'jointjs';
import {MyLink} from './MyLink'
import {LinkModel} from './../model/LinkModel'
import {Vertex} from './../model/Vertex'
import {VertexView} from './VertexView'
import {GraphModel} from './../model/GraphModel'
import * as Collections from 'typescript-collections';

export class MyLinkView extends joint.dia.LinkView {
	_vertexDictionary: Collections.Dictionary<Vertex, VertexView>;
	_graphModel:GraphModel
	constructor(vd:Collections.Dictionary<Vertex, VertexView>,gm:GraphModel) {
		super()
		this._vertexDictionary=vd
		this._graphModel=gm
	}
	

	public pointerclick(evt: joint.dia.Event, x, y) {
		var myLink: MyLink = this.model as MyLink

		var linkModel: LinkModel = myLink.linkModel
		var startVertex: Vertex = linkModel.startVertex
		var endVertex: Vertex = linkModel.endVertex

		var startVertexView: VertexView = this._vertexDictionary.getValue(startVertex)
		var endVertexView: VertexView = this._vertexDictionary.getValue(startVertex)
		this._graphModel.points
		this.model.remove();
	}

}
