namespace SpaceInvaders {
    import ƒ = FudgeCore;
    export class Projectile extends Rigidbody{

        public mesh: ƒ.ComponentMesh;
        public material: ƒ.ComponentMaterial;

        public transform: ƒ.ComponentTransform;

        public size: number = 0.1;


        constructor(_position: ƒ.Vector3, _scale?: ƒ.Vector3, _name?: string) {
            super(_position, _scale, _name);
        }
    }
}