export const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;
const middleX = window.innerWidth /2;
const middleY = window.innerHeight /2;
ctx.translate(middleX, middleY); 
const dLine = 600;
type Position  = {
    x : number,
    y : number,
    z : number
}
type Angles = {
    tetha : number, 
    alpha : number
}
export class Geometry {
    color : string 
    constructor(color : string ){
        this.color = color;
    }
    renderObject(camera : Camera){
        console.log("Renderizador de todos los objetos");
    }

}
/*
export class Renderer{
    constructor(){

    }
}*/


export class BoxGeometry extends Geometry{
    color : string
    position : Position = {
        x : 0,
        y : 0,
        z : 0,
    }
    lineWidth : number;
    width : number;
    height : number;
    depth : number;
    Vert = [
        [1,1,1], 
        [1,-1,1],
        [-1,-1,1],
        [1,-1,1], 
        [1,1,-1], 
        [1,-1,-1],
        [-1,-1,-1],
        [1,-1,-1], 
    ]
    // All comments in cube faces, obviusly depends on perspective of camara
    faces = [
        [0, 1, 2, 3], // Up Face
        [4, 5, 6, 7], // Down Face
        [0, 4, 7, 3], // Lateral Face right
        [1, 5, 6, 2], // Lataral Face Left 
        [0, 4, 5, 1], // Frontal Face
        [3, 7, 6, 2] // Back Face
    ]
    constructor(width = 1, height = 1, depth = 1, lineWidth =1, color = "black"){
        super(color);
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.lineWidth = lineWidth;
        this.color = color;
        this.setVerts();
    }
    setPosition(posX = 0, posY = 0, posZ = 0){
        this.position.x = posX;
        this.position.y = posY;
        this.position.z = posZ;
        this.setVerts();
    }
    renderObject(camera : Camera): void {
        super.renderObject(camera);
        for (let index = 0; index < this.faces.length; index++) {
            const face = this.faces[index];
            let deltaXP1 = camera.position.x - this.Vert[face[0]][0];
            let deltaYP1 = camera.position.y - this.Vert[face[0]][2];
            let deltaZP1 = camera.position.z - this.Vert[face[0]][1];
            let deltaXP2 = camera.position.x - this.Vert[face[1]][0];
            let deltaYP2 = camera.position.y - this.Vert[face[1]][2];
            let deltaZP2 = camera.position.z - this.Vert[face[1]][1];
            let deltaXP3 = camera.position.x - this.Vert[face[2]][0];
            let deltaYP3 = camera.position.y - this.Vert[face[2]][2];
            let deltaZP3 = camera.position.z - this.Vert[face[2]][1];
            let deltaXP4 = camera.position.x - this.Vert[face[3]][0];
            let deltaYP4 = camera.position.y - this.Vert[face[3]][2];
            let deltaZP4 = camera.position.z - this.Vert[face[3]][1];
            console.log(deltaZP1, deltaZP2, deltaZP3, deltaZP4);
            //console.log(this.Vert[face[0]][0], this.Vert[face[0]][2])
            ctx.beginPath();
            ctx.moveTo( deltaXP1 * (dLine / deltaZP1 ) , 
            deltaYP1 * (dLine / deltaZP1) + this.height * 0.5);
            ctx.lineTo( deltaXP2 *(dLine / deltaZP2 ) + this.width * 0.5 , 
            deltaYP2 * (dLine / deltaZP2)+ this.height * 0.5);
            ctx.lineTo( deltaXP3 * (dLine / deltaZP3) + this.width * 0.5,
            deltaYP3 * (dLine /  deltaZP3 ) + this.height * 0.5);
            ctx.lineTo( deltaXP4 * (dLine / deltaZP4) + this.width * 0.5, 
            deltaYP4 * (dLine / deltaZP4 ) + this.height * 0.5);
            ctx.lineTo( deltaXP1 * (dLine / deltaZP1)  + this.width * 0.5, 
            deltaYP1 * (dLine /  deltaZP1 ) + this.height * 0.5);
            console.log(this.color);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
    private setVerts(){
        // Middle X, Y and Z
        var middleX = this.width / 2;
        var middleY = this.height / 2;
        var middleZ = this.depth / 2;
        // Higher and Lower (X, Y, Z)
        var highVertX = this.position.x + middleX;
        var lowVertX = this.position.x - middleX;
        var highVertZ = this.position.z + middleZ;
        var lowVertZ = this.position.z - middleZ;
        var highVertY = this.position.y + middleY;
        var lowVertY = this.position.y - middleY;
        // Set Vert 
        this.Vert = [
            [highVertX,highVertZ,highVertY],
            [lowVertX,highVertZ,highVertY],
            [lowVertX,lowVertZ,highVertY],
            [highVertX,lowVertZ,highVertY],
            [highVertX,highVertZ,lowVertY],
            [lowVertX,highVertZ,lowVertY],
            [lowVertX,lowVertZ,lowVertY],
            [highVertX,lowVertZ,lowVertY]
        ]
        console.log(this.Vert);
    }
}
export class Camera {
    position : Position = {
        x : 0,
        y : 0,
        z : 0,
    }
    angles : Angles = {
        tetha : 0,
        alpha: 0

    }


    constructor(far = 2000, near = 0.01){
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.angles.tetha = 0;
        this.angles.alpha = 0;

    }
    public setPosition(posX = 0, posY = 0, posZ = 0){
        this.position.x = posX;
        this.position.y = posY;
        this.position.z = posZ;
    }
    public setAngles(angTetha = 0, angAlpha = 0){
        this.angles.tetha = angTetha;
        this.angles.alpha = angAlpha;
    }
}