"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Character extends SpaceInvaders.Rigidbody {
        constructor(_position, _scale) {
            super(_position, _scale, "Character");
            this.projectileSpeed = 5;
        }
        shootProjectile() {
            SpaceInvaders.projectiles.appendChild(new SpaceInvaders.Projectile(this.mtxLocal.translation));
        }
    }
    SpaceInvaders.Character = Character;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Character.js.map