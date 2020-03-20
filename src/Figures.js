'use strict';
exports.__esModule = true;
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
var FigureParameter = /** @class */ (function () {
    function FigureParameter(n, def, min, max) {
        if (min === undefined /*notpresent*/)
            this.min = 0.0;
        if (max === undefined /*notpresent*/)
            this.max = Infinity;
        /** @type {string} */
        this.n = n;
        /** @type {number} */
        this.def = def;
        /** @type {number} */
        this.min = min;
        /** @type {number} */
        this.max = max;
    }
    Object.defineProperty(FigureParameter.prototype, "name", {
        get: function () {
            return this.n;
        },
        set: function (n) {
            this.n = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FigureParameter.prototype, "minumum", {
        get: function () {
            return this.min;
        },
        set: function (min) {
            this.min = min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FigureParameter.prototype, "maximum", {
        get: function () {
            return this.max;
        },
        set: function (max) {
            this.max = max;
        },
        enumerable: true,
        configurable: true
    });
    return FigureParameter;
}());
exports.FigureParameter = FigureParameter;
