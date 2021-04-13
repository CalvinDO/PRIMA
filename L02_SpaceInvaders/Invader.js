"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Invader extends SpaceInvaders.Rigidbody {
        constructor(_position, _scale, _name) {
            super(_position, _scale, _name);
        }
    }
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map