"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Projectile extends SpaceInvaders.Rigidbody {
        constructor(_position, _scale, _name) {
            super(_position, _scale, _name);
            this.size = 0.1;
        }
    }
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map