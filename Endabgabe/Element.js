"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Element extends ƒ.Node {
        size = 1;
        type;
        data;
        constructor(_type, _translation, _rotation) {
            super("Element" + _type.toString());
            this.type = _type;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
            this.cmpTransform.mtxLocal.translate(_translation);
            this.cmpTransform.mtxLocal.rotate(_rotation);
            this.setData();
        }
        async setData() {
            this.data = await ƒ.Project.createGraphInstance(Endabgabe.ElementLoader.elementMap[this.type]);
            //   this.data.cmpTransform.mtxLocal.translate(this.translation);
            // this.data.cmpTransform.mtxLocal.rotate(this.rotation);
            this.appendChild(this.data);
        }
        addRigidbodies() {
            for (let wall of this.data.getChildren()) {
                let rb = new ƒ.ComponentRigidbody(10, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
                wall.addComponent(rb);
            }
        }
        collidesWith(_position) {
            let maxDimension = this.mtxWorld.translation;
            let maxScaleVector = new ƒ.Vector3(this.size / 2, this.size / 2, this.size / 2);
            //maxScaleVector.transform(this.mtxWorld, false);
            maxDimension.add(maxScaleVector);
            let minDimension = this.mtxWorld.translation;
            let minScaleVector = new ƒ.Vector3(this.size / 2, this.size / 2, this.size / 2);
            //minScaleVector.transform(this.mtxWorld, false);
            minDimension.subtract(minScaleVector);
            if (_position.x < minDimension.x || _position.x > maxDimension.x) {
                return false;
            }
            if (_position.y < minDimension.y || _position.y > maxDimension.y) {
                return false;
            }
            if (_position.z < minDimension.z || _position.z > maxDimension.z) {
                return false;
            }
            return true;
        }
    }
    Endabgabe.Element = Element;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Element.js.map