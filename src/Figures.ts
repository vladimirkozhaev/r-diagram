'use strict';
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// This file holds definitions of all standard shape figures -- string values for Shape.figure.

// The following functions and variables are used throughout this file:

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

class FigureParameter {

    n: string;
    def: number;
    min: number;
    max: number;

    constructor( n: string, def: number, min: number, max: number ) {
        if (min === undefined/*notpresent*/ ) this.min = 0.0;
        if (max === undefined/*notpresent*/ ) this.max = Infinity;
        /** @type {string} */
        this.n = n;
        /** @type {number} */
        this.def = def;
        /** @type {number} */
        this.min = min;
        /** @type {number} */
        this.max = max;
    }

    get name(): string {
        return this.n;
    }

    set name( n: string ) {
        this.n = n;
    }

    get minumum(): number {
        return this.min
    }




    set minumum( min: number ) {
        this.min = min;
    }

    get maximum(): number {
        return this.max
    }

    set maximum( max: number ) {
        this.max = max;
    }

}