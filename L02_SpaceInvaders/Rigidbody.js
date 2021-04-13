"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Rigidbody extends ƒ.Node {
        constructor(_position, _scale, _name) {
            super("Rigidbody");
            this.createVisual();
            this.addComponent(new ƒ.ComponentTransform);
            this.mtxLocal.translation = _position;
            this.mtxLocal.scale(_scale);
        }
        createVisual() {
            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.addComponent(this.material);
        }
        translate(_translation) {
            this.mtxLocal.translate(_translation);
        }
        translateX(_translation) {
            this.mtxLocal.translateX(_translation);
        }
        checkCollision() {
        }
    }
    SpaceInvaders.Rigidbody = Rigidbody;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Rigidbody.js.map