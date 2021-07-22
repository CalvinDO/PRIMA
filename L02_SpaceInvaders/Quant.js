"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Quant extends SpaceInvaders.Rigidbody {
        projectileSpeed = 5;
        constructor(_position, _scale) {
            super(_position, _scale, "Quant");
        }
        shootProjectile() {
            SpaceInvaders.projectiles.appendChild(new SpaceInvaders.Projectile(this.mtxLocal.translation));
        }
    }
    SpaceInvaders.Quant = Quant;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Quant.js.map