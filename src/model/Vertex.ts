import * as B from 'Backbone';
import {Point} from "./Point"
import {Edge} from "./Edge"

/*
* http://usejsdoc.org/
*/
class Vertex{
	_point:Point;
	_startEdges:B.Collection<Edge>
	_endEdges:B.Collection<Edge>
}
