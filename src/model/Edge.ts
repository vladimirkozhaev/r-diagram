import {Vertex} from './Vertex'
/*
* http://usejsdoc.org/
*/
class Edge{
	_starVertex:Vertex;
	_endVertex:Vertex;
	
	public set startVertex(_startVertex:Vertex){
		this._starVertex=_startVertex;
	}
	
	public set endVertex(_endVertex:Vertex){
		this._endVertex=_endVertex;
	}
	
	
	public get startVertex():Vertex {
		return this._endVertex;
	}
	
	public get endVertex():Vertex {
		return this._endVertex;
	}
	

}
