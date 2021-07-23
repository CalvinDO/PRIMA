namespace Endabgabe {

    (function (_graphId) {
        window.addEventListener("load", init);


        // show dialog for startup
        let dialog: HTMLDialogElement;
        function init(_event: Event) {
            dialog = document.querySelector("dialog");
            dialog.addEventListener("click", function (_event) {
                dialog.close();
                startInteractiveViewport();
            });
            dialog.showModal();
        }

        // setup and start interactive viewport
        async function startInteractiveViewport() {

            await ƒ.Project.loadResourcesFromHTML();
            ƒ.Debug.log("Project:", ƒ.Project.resources);


            // setup the viewport
            
            await Main.init();
          
        
            // make the camera interactive (complex method in FudgeAid)
            //FudgeAid.Viewport.expandCameraToInteractiveOrbit(viewport);

            // setup audio
         

            // draw viewport once for immediate feedback
            //viewport.draw();
            //canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));

        }
    })(Main.rootGraphId);
}