import * as go from 'gojs'

// Produce a Geometry that includes an arrowhead at the end of each segment.
// This only works with orthogonal non-Bezier routing.
export class MultiArrowLink extends go.Link {
    constructor() {
        super()
        go.Link.call( this );
    }

    // produce a Geometry from the Link's route
    public makeGeometry(): any {
        // get the Geometry created by the standard behavior
        var geo = go.Link.prototype.makeGeometry.call( this );
        if ( geo.type !== go.Geometry.Path || geo.figures.length === 0 ) return geo;
        var mainfig = geo.figures.elt( 0 );  // assume there's just one PathFigure
        var mainsegs = mainfig.segments;

        var arrowLen = 8;  // length for each arrowhead
        var arrowWid = 3;  // actually half-width of each arrowhead
        var fx = mainfig.startX;
        var fy = mainfig.startY;
        for ( var i = 0; i < mainsegs.length; i++ ) {
            var a = mainsegs.elt( i );
            // assume each arrowhead is a simple triangle
            var ax = a.endX;
            var ay = a.endY;
            var bx = ax;
            var by = ay;
            var cx = ax;
            var cy = ay;
            if ( fx < ax - arrowLen ) {
                bx -= arrowLen; by += arrowWid;
                cx -= arrowLen; cy -= arrowWid;
            } else if ( fx > ax + arrowLen ) {
                bx += arrowLen; by += arrowWid;
                cx += arrowLen; cy -= arrowWid;
            } else if ( fy < ay - arrowLen ) {
                bx -= arrowWid; by -= arrowLen;
                cx += arrowWid; cy -= arrowLen;
            } else if ( fy > ay + arrowLen ) {
                bx -= arrowWid; by += arrowLen;
                cx += arrowWid; cy += arrowLen;
            }
            geo.add( new go.PathFigure( ax, ay, true )
                .add( new go.PathSegment( go.PathSegment.Line, bx, by ) )
                .add( new go.PathSegment( go.PathSegment.Line, cx, cy ).close() ) );
            fx = ax;
            fy = ay;
        }

        return geo;
    }
}
