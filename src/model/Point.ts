/*
* http://usejsdoc.org/
*/
export class Point {
	_x: number;
	_y: number;
	_canConnect:boolean;
	
	constructor(_x: number, _y: number,_canConnect:boolean) {
		this._x = _x;
		this._y = _y;
		this._canConnect=_canConnect;
	}
	
	get x(){
		return this._x;
	}
	
	get y(){
		return this._y;
	}
	
	set x(_x:number){
		this._x=_x;
	}
	
	
	set y(_y:number){
		this._y=_y
	}

	get canConnect(){
		return this._canConnect;
	}
	
	public toString():String{
		return "point:"+this._x+" "+this._y
	}
}