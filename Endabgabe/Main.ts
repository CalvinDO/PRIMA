namespace Endabgabe {


    export class Main {

        public static rootGraphId: string = "Graph|2021-07-23T14:18:52.304Z|39896";

        public static root: ƒ.Graph;
        public static createdElements: ƒ.Node;

        public static avatar: ƒ.Node;

        public static avatarRb: ƒ.ComponentRigidbody;
        public static avatarHeadHeight: number = 0.5;

        public static cmpCamera: ƒ.ComponentCamera;

        public static viewport: ƒ.Viewport;

        public static rotationSpeed: number = 0.2;
        public static maxXRotation: number = 85;

        public static async init(): Promise<void> {
            Main.root = <ƒ.Graph>ƒ.Project.resources[Main.rootGraphId];

            await ElementLoader.init();
            Main.cmpCamera = new ƒ.ComponentCamera();

            Main.cmpCamera.mtxPivot.translateY(Main.avatarHeadHeight);

            await ElementLoader.createElements();

            Main.createAvatar();
            Main.createRigidbodies();
            ƒ.Physics.adjustTransforms(Main.root, true);
            Main.setupAudio();



            Main.root.getChildrenByName("Ground")[0].addComponent(new ƒ.ComponentRigidbody(100, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));


            window.addEventListener("mousemove", Main.onMouseMove);


            let canvas = document.querySelector("canvas");
            Main.viewport = new ƒ.Viewport();
            Main.viewport.initialize("InteractiveViewport", this.root, Main.cmpCamera, canvas);

            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });



            ƒ.Debug.log("Graph:", this.root);
            ƒ.Debug.log("Viewport:", Main.viewport);

            //ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY;
            // ƒ.Physics.settings.debugDraw = true;


            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Main.update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        }

        private static setupAudio(): void {
            let cmpListener = new ƒ.ComponentAudioListener();
            Main.cmpCamera.getContainer().addComponent(cmpListener);
            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(this.root);
            ƒ.Debug.log("Audio:", ƒ.AudioManager.default);
        }

        private static onMouseMove(_event: MouseEvent): void {
            Main.avatarRb.rotateBody(ƒ.Vector3.Y(-_event.movementX * Main.rotationSpeed));

            let XIncrement: number = _event.movementY * Main.rotationSpeed;
            let currentX: number = Main.cmpCamera.mtxPivot.rotation.x;
            let nextFrameX: number = XIncrement + currentX;

            if (nextFrameX > Main.maxXRotation) {
                XIncrement = Main.maxXRotation - currentX;
            }

            if (nextFrameX < -Main.maxXRotation) {
                XIncrement = -Main.maxXRotation - currentX;
            }

            Main.cmpCamera.mtxPivot.rotateX(XIncrement);


        }
        private static clamp(_input: number, _max: number, _min: number): number {
            return _input > _max ? _max : (_input < _min ? _min : _input);
        }

        private static update() {
            ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);

            Main.viewport.draw();
        }

        private static createRigidbodies() {
            for (let element of Main.createdElements.getChildren()) {

                for (let wall of element.getChildren()) {

                   // let transform: ƒ.ComponentTransform = wall.cmpTransform;
                    //console.log(transform.mtxLocal);

                    //let rotation: ƒ.Vector3 = transform.mtxLocal.rotation;
                    //let translation: ƒ.Vector3 = transform.mtxLocal.translation;
                    //let mtxLocal: ƒ.Matrix4x4 = transform.mtxLocal;

                    wall.addComponent(new ƒ.ComponentRigidbody(100, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));

                   // wall.removeComponent(transform);
                    //wall.addComponent(new ƒ.ComponentTransform(mtxLocal));
                }
            }
        }

        private static createAvatar() {


            Main.avatarRb = new ƒ.ComponentRigidbody(32.5, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
            Main.avatarRb.restitution = 0.2;
            Main.avatarRb.rotationInfluenceFactor = ƒ.Vector3.ZERO();
            Main.avatarRb.friction = 5;

            Main.avatar = new ƒ.Node("Avatar");
            Main.avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(Main.avatarHeadHeight * 3))));
            Main.avatar.addComponent(Main.avatarRb);
            Main.avatar.addComponent(Main.cmpCamera);


            Main.root.appendChild(Main.avatar);
        }

    }
}
