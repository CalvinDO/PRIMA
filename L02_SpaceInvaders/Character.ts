namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Character extends Rigidbody {
        public projectileSpeed: number = 5;


        constructor(_position: ƒ.Vector3, _scale: ƒ.Vector3) {
            super(_position, _scale, "Character");
        }

        public shootProjectile(): void {
            projectiles.appendChild(new Projectile(this.mtxLocal.translation));
        }
    }
}