namespace Endabgabe {
    export class Element extends ƒ.Node {
        private size: number = 1;
        public type: ElementType;

        public data: ƒ.GraphInstance;


        constructor(_type: ElementType, _translation: ƒ.Vector3, _rotation: ƒ.Vector3) {
            super("Element" + _type.toString());

            this.type = _type;

            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
            this.cmpTransform.mtxLocal.translate(_translation);
            this.cmpTransform.mtxLocal.rotate(_rotation);
        }

        public async setData(): Promise<void> {
            this.data = await ƒ.Project.createGraphInstance(ElementLoader.elementMap[this.type]);

            this.appendChild(this.data);
        }

        public addRigidbodies(): void {

            for (let wall of this.data.getChildren()) {
                let rb: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(10, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);

                wall.addComponent(rb);
            }
        }


        public collidesWith(_position: ƒ.Vector3): boolean {
            let maxDimension: ƒ.Vector3 = this.mtxWorld.translation;

            let maxScaleVector: ƒ.Vector3 = new ƒ.Vector3(this.size / 2, this.size / 2, this.size / 2);
            //maxScaleVector.transform(this.mtxWorld, false);

            maxDimension.add(maxScaleVector);


            let minDimension: ƒ.Vector3 = this.mtxWorld.translation;

            let minScaleVector: ƒ.Vector3 = new ƒ.Vector3(this.size / 2, this.size / 2, this.size / 2);
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
}