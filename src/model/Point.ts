import * as B from 'Backbone';
import { IPointsContainer } from './IPointsContainer'
/*
* http://usejsdoc.org/
*/
export class Point extends B.Model {
	_x: number;
	_y: number;
	_canConnect: boolean;
	_parent: IPointsContainer;


	constructor(_x: number, _y: number, _canConnect: boolean) {
		super()
		this._x = _x;
		this._y = _y;
		this._canConnect = _canConnect;
	}

	public get parent(): IPointsContainer {
		return this._parent;
	}

	public set parent(p: IPointsContainer) {
		this._parent = p;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	set x(_x: number) {
		this._x = _x;
		this.trigger("x:changed",this._x)
	}


	set y(_y: number) {
		this._y = _y		
		this.trigger("y:changed",this._y)
	}

	get canConnect() {
		return this._canConnect;
	}

	public toString(): String {
		return "point:" + this._x + " " + this._y
	}
}