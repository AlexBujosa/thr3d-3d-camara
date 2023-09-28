import { BoxGeometry, Camera, ctx, canvas } from "./classes/thr3d.js";
var  posX : number  = 0, posY : number = 1, posZ: number = 1;
var spin : number = 0.03
let newBoxGeometry = new BoxGeometry(1,1,1,1, "#2222EE");
newBoxGeometry.setPosition(0,0, -1)
let newBoxGeometryD = new BoxGeometry(1,1,1,1);
newBoxGeometryD.setPosition(0,0, -2)
let newBoxGeometryA = new BoxGeometry(1,1,1,1, "#c93384");
newBoxGeometryA.setPosition(0,0, -3)
let newBoxGeometryV = new BoxGeometry(1,1,1,1, "green");
newBoxGeometryV.setPosition(-1,0, -1)
let camera = new Camera();
function clearScreen(){
    ctx.clearRect(-630, -301, canvas.width, canvas.height)

}
function RenderFrame(){
    clearScreen()
    camera.setPosition(posX,posY, posZ);
    newBoxGeometryV.renderObject(camera);
    newBoxGeometryA.renderObject(camera);
    newBoxGeometryD.renderObject(camera);
    newBoxGeometry.renderObject(camera);
}
document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyW') {
        posY += spin;
        RenderFrame()
    }
    else if (e.code == 'KeyA') {
        posX += spin;
        RenderFrame()
    }
    else if (e.code == 'KeyD') {
        posX -= spin;
        RenderFrame()
    }
    else if (e.code == 'KeyS') {
        posY -= spin;
        RenderFrame()
    }
});
RenderFrame()



