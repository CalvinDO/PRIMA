namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Quant extends Rigidbody {
        public projectileSpeed: number = 5;


        constructor(_position: ƒ.Vector3, _scale: ƒ.Vector3) {
            super(_position, _scale, "Quant");
        }

        public shootProjectile(): void {
            projectiles.appendChild(new Projectile(this.mtxLocal.translation));
        }
    }
}