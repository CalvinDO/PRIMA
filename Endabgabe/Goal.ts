namespace Endabgabe {

    export class Goal extends Element {

        public static goalGreeblesID: string = "Material|2021-07-24T04:07:50.941Z|51356";
        public goalGreebles: ƒ.Material;

        constructor(_translation: ƒ.Vector3, _rotation: ƒ.Vector3) {

            super(ElementType.DeadEnd, _translation, _rotation);
            this.goalGreebles = <ƒ.Material>ƒ.Project.resources[Goal.goalGreeblesID];
        }

        public override async setData(): Promise<void> {
            await super.setData();

            for (let wall of this.data.getChildren()) {
                wall.getComponent(ƒ.ComponentMaterial).material = this.goalGreebles;
            }
        }
    }
}