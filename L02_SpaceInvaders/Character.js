"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    class Character extends SpaceInvaders.Rigidbody {
        projectileSpeed = 5;
        constructor(_position, _scale) {
            super(_position, _scale, "Character");
        }
        shootProjectile() {
            SpaceInvaders.projectiles.appendChild(new SpaceInvaders.Projectile(this.mtxLocal.translation));
        }
    }
    SpaceInvaders.Character = Character;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Character.js.map