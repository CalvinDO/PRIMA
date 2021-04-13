namespace SpaceInvaders {
    import ƒ = FudgeCore;
    export class Invader extends Rigidbody {

        public mesh: ƒ.ComponentMesh;
        public material: ƒ.ComponentMaterial;

        public transform: ƒ.ComponentTransform;

        constructor(_position: ƒ.Vector3, _scale: ƒ.Vector3, _name: string) {
            super(_position, _scale, _name);
        }
    }
}