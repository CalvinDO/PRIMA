namespace Endabgabe {

    export class Main {
        public static rootGraphId: string = "Graph|2021-07-23T18:40:28.353Z|85227";

        public static root: ƒ.Graph;
        public static createdElements: ƒ.Node;

        public static avatar: ƒ.Node;

        public static avatarRb: ƒ.ComponentRigidbody;
        public static avatarHeadHeight: number = 0.5;

        public static cmpCamera: ƒ.ComponentCamera;

        public static viewport: ƒ.Viewport;

        public static rotationSpeed: number = 0.1;
        public static maxXRotation: number = 85;

        public static acceleration: number = 0.4;
        public static drag: number = 0.1;

        public static preInit(): void {
            Main.init();
        }

        public static async init(): Promise<void> {
            await ƒ.Project.loadResourcesFromHTML();
            ƒ.Debug.log("Project:", ƒ.Project.resources);

            Main.root = <ƒ.Graph>ƒ.Project.resources[Main.rootGraphId];

            //await ElementLoader.init();
            //await ElementLoader.createElements();

            Main.cmpCamera = new ƒ.ComponentCamera();

            Main.cmpCamera.mtxPivot.translateY(Main.avatarHeadHeight);


            //Main.root.getChildrenByName("Ground")[0].addComponent(new ƒ.ComponentRigidbody(100, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));

            //ƒ.Physics.adjustTransforms(Main.root, true);

            let test: ƒ.Node = Main.root.getChildrenByName("Test")[0];

            // let matrizes: ƒ.Matrix4x4[] = [];

            for (let wall of Main.root.getChildren()) {
                //matrizes.push(wall.cmpTransform.mtxLocal);
                console.log(wall)
                wall.addComponent(new ƒ.ComponentRigidbody(10, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
                //console.log(wall);
            }

            Main.createAvatar();
            Main.createRigidbodies();
            Main.setupAudio();

            ƒ.Physics.adjustTransforms(Main.root, true);



            window.addEventListener("mousemove", Main.onMouseMove);


            let canvas = document.querySelector("canvas");
            Main.viewport = new ƒ.Viewport();
            Main.viewport.initialize("InteractiveViewport", Main.root, Main.cmpCamera, canvas);

            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });



            ƒ.Debug.log("Graph:", Main.root);
            ƒ.Debug.log("Viewport:", Main.viewport);

            ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY;
            ƒ.Physics.settings.debugDraw = true;


            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Main.update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        }

        private static setupAudio(): void {
            let cmpListener = new ƒ.ComponentAudioListener();
            Main.cmpCamera.getContainer().addComponent(cmpListener);
            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(Main.root);
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

            Main.handleKeys();
            Main.playerMovement();

            Main.viewport.draw();
        }

        private static handleKeys() {
            let playerForward: ƒ.Vector3 = ƒ.Vector3.Z();
            let playerLeft: ƒ.Vector3 = ƒ.Vector3.X();

            playerForward.transform(Main.avatar.mtxWorld, false);
            playerLeft.transform(Main.avatar.mtxWorld, false);

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
                playerForward.scale(Main.acceleration);
                Main.avatarRb.addVelocity(playerForward);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                playerForward.scale(-Main.acceleration);
                Main.avatarRb.addVelocity(playerForward);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                playerLeft.scale(Main.acceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                playerLeft.scale(-Main.acceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }

            let velo: ƒ.Vector3 = Main.avatarRb.getVelocity();
            let xZVelo: ƒ.Vector2 = new ƒ.Vector2(velo.x, velo.z);

            if (xZVelo.magnitude >= 0) {
                xZVelo.scale(1 - Main.drag);
                let newVelo: ƒ.Vector3 = new ƒ.Vector3(xZVelo.x, velo.y, xZVelo.y);
                Main.avatarRb.setVelocity(newVelo);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]))
                Main.avatarRb.applyLinearImpulse(new ƒ.Vector3(0, 30, 0));

        }

        private static playerMovement(): void {
            let playerForward: ƒ.Vector3 = ƒ.Vector3.Z();
            playerForward.transform(Main.avatar.mtxWorld, false);

            let movementVelocity: ƒ.Vector3 = new ƒ.Vector3();
            //movementVelocity.x = playerForward.x * (Main.forwardMovement + Main.backwardMovement) * Main.movementspeed;
            //movementVelocity.y = Main.cmpAvatar.getVelocity().y;

            //movementVelocity.z = playerForward.z * (Main.forwardMovement + Main.backwardMovement) * Main.movementspeed;
            //Main.avatarRb.setVelocity(movementVelocity);

        }

        private static createRigidbodies() {
            if (!Main.createdElements) {
                return;
            }
            for (let element of Main.createdElements.getChildren()) {

                for (let wall of element.getChildren()) {

                    //let transform: ƒ.ComponentTransform = wall.cmpTransform;
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

            Main.avatar.mtxLocal.translateX(2);

            Main.root.appendChild(Main.avatar);
        }

    }

    window.addEventListener("load", Main.preInit);
}
