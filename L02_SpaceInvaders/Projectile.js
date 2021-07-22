"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Projectile extends SpaceInvaders.Rigidbody {
        mesh;
        material;
        transform;
        size = 0.1;
        constructor(_position, _scale, _name) {
            super(_position, _scale, _name);
        }
    }
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map