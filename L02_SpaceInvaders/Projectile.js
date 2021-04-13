"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends ƒ.Node {
        constructor(_position) {
            super("Projectile");
            this.size = 0.1;
            this.createVisual();
            this.addComponent(new ƒ.ComponentTransform);
            this.mtxLocal.translation = _position;
        }
        createVisual() {
            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.mesh.mtxPivot.scale(new ƒ.Vector3(this.size, this.size, this.size));
            this.addComponent(this.material);
        }
        translateY(_translation) {
            this.mtxLocal.translateY(_translation);
        }
    }
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map