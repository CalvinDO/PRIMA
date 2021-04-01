namespace L01_FirstFudge {
    import ƒ = FudgeCore;

    window.addEventListener("load", init);

    let graph: ƒ.Node = new ƒ.Node("Graph");

    let cube: ƒ.Node = new ƒ.Node("Cube");
    let cmpMesh: ƒ.ComponentMesh;

    let viewport = new ƒ.Viewport();


    let gravity: number = -2;
    let velocity: ƒ.Vector3 = new ƒ.Vector3(0.5, 0, 0);
    let position: ƒ.Vector3 = new ƒ.Vector3(0, 5, 0);

    let bounceBoundaryBoxWidth: number = 10;

    let canvas: HTMLCanvasElement;


    function init(): void {

        canvas = document.querySelector("canvas");

        createBouncingBall();

        initializeCameraAndViewport();

        //generateVisualBounceBoundingBox();

        initializeLight();


        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        update();
    }

    function initializeLight(): void {

        let light: ƒ.LightAmbient = new ƒ.LightAmbient();
        let lightNode: ƒ.Node = new ƒ.Node("light");
        lightNode.addComponent(new ƒ.ComponentLight(light));

        graph.appendChild(lightNode);
    }

    function initializeCameraAndViewport(): void {

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(2);
        cmpCamera.mtxPivot.rotateY(180);


        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
    }

    function generateVisualBounceBoundingBox(): void {
        let bounceBox: ƒ.Node = new ƒ.Node("BounceBox");
        bounceBox.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("MyOwnColor2", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("grey")))));
        let bounceBoxMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(new ƒ.MeshCube());
        bounceBoxMesh.mesh.flipNormals();

        bounceBox.addComponent(bounceBoxMesh);

        bounceBoxMesh.mtxPivot.scale(new ƒ.Vector3(10, 10, 10));
        graph.appendChild(bounceBox);
    }

    function createBouncingBall(): void {

        cube.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("MyOwnColor", ƒ.ShaderFlat)));
        cmpMesh = new ƒ.ComponentMesh( new ƒ.MeshCube());

        cube.addComponent(cmpMesh);

        graph.appendChild(cube);
    }


    function update(): void {

        velocity.y += gravity * ƒ.Loop.timeFrameReal / 1000;

        position.add(ƒ.Vector3.SCALE(velocity, ƒ.Loop.timeFrameReal / 1000 ));

        //graph.mtxWorld.translateZ(10);
        cmpMesh.mtxPivot.translation = position;
        viewport.draw();

        calculate();
    }

    function calculate(): void {

        if (cmpMesh.mtxPivot.translation.y < 0) {
            velocity.y *= -1;
            position.y = 0.01;
        }
        if (cmpMesh.mtxPivot.translation.x > bounceBoundaryBoxWidth / 2) {
            velocity.x *= -1;
            position.x = bounceBoundaryBoxWidth / 2 - 0.01;
        }
        if (cmpMesh.mtxPivot.translation.x < -bounceBoundaryBoxWidth / 2) {
            velocity.x *= -1;
            position.x = - bounceBoundaryBoxWidth / 2 + 0.01;
        }
    }
}