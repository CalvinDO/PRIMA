"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Goal extends Endabgabe.Element {
        static goalGreeblesID = "Material|2021-07-24T04:07:50.941Z|51356";
        goalGreebles;
        constructor(_translation, _rotation) {
            super(Endabgabe.ElementType.DeadEnd, _translation, _rotation);
            this.goalGreebles = ƒ.Project.resources[Goal.goalGreeblesID];
        }
        async setData() {
            await super.setData();
            for (let wall of this.data.getChildren()) {
                wall.getComponent(ƒ.ComponentMaterial).material = this.goalGreebles;
            }
        }
    }
    Endabgabe.Goal = Goal;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Goal.js.map