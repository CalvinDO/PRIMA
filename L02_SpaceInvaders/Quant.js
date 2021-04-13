"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Quant extends SpaceInvaders.Rigidbody {
        constructor(_position, _scale) {
            super(_position, _scale, "Quant");
            this.projectileSpeed = 5;
        }
        shootProjectile() {
            SpaceInvaders.projectiles.appendChild(new SpaceInvaders.Projectile(this.mtxLocal.translation));
        }
    }
    SpaceInvaders.Quant = Quant;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Quant.js.map