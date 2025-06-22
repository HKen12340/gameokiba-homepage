

var can = document.getElementById("can");
var con = can.getContext("2d");
var jump = false;
var point = 0;

var jumpse = document.getElementById("jump");
var Gameoverse = document.getElementById("gameover");
var BGM = document.getElementById("BGM");

var Try = document.getElementById("trybotton");
var sendmemu = document.getElementById("sendmemu");
var ffff = 0;
class Player{
constructor(px,py,x,y,pj,g){
        this.px = px;
        this.py = py;
        this.pj = pj;
        this.pj2 = pj;
        this.x = x;
        this.x2 = x;
        this.y = y;
        this.y2 = y; 
        this.g = g;
        this.g2 = g;
        this.Acount = 0;
        this.a = 1;
        this.alive = true;
    }

jump(){
if(this.y <= 140){
    this.y+=(this.pj+=this.g);
    }
if(this.y > 140){
    jump = false;
    this.y = this.y2;
    this.pj = this.pj2;
    this.g = this.g2;
}
    }
    
draw(){
let image = new Image();
if(jump)image.src = "image/p1.png";
else{
image.src = "image/p"+this.a+".png";
if(this.Acount % 3== 0){
    this.a *= -1;
    this.Acount = 0;
 }
}
this.Acount++;
con.drawImage(image,this.x,this.y,this.px,this.py);
// con.rect(this.x,this.y,this.px,this.py);
// con.fillStyle = "red";
// con.fill();
}

}
let onx = Array(3);
let rraa = 0;
class Obstacle{
    constructor(ox,oy,x,y){
        this.ox = ox;
        this.oy = oy;
        this.x = x;
        this.y = y;
        this.speed = 9;

    }

move(){
    
    this.x -= this.speed;
}

draw(){
let image = new Image();
image.src = "image/o.png";
con.drawImage(image,this.x,this.y,this.ox,this.oy);
/*con.rect(this.x,this.y,this.ox,this.oy);
con.fillStyle = "red";
con.fill();*/
}
}

function score(){
   point++;
   con.fillStyle = "yellow";
　   con.font = "20px'MSゴシック'";
   con.fillText("score:"+point,can.width-120,30);
   if(point%100 == 0){
       for(let i=0;i<o.length;i++){
   o[i].speed += 3;
   ffff += 100;
       }
   grnx += 3;
   }
}

var fps;

var p = new Player(50,50,60,140,-23,2);

var o = Array(3);
for(let i=0;i<3;i++){
 o[i] = new Obstacle(30,60,can.width,140,i);
}

var paternY = [[150,150,150,150],
               [150,130,160,160],
               [150,150,150,150]];

var paternOY = [[105,110,90,80],
               [100,100,60,100],
               [100,120,100,110]];

var paternOX = [[20,70,30,40],
                [50,60,70,50],
                [50,35,20,30]];

var paternX = [[100,500,1000,1300],
               [100,400,800,1200],
               [100,700,1100,1500]];

               

let grx = 0;
let grnx = 9;

function start(){      
    can.style.backgroundImage = 'url(image/haikei.png)'; 
    fps = setInterval(main,50);
 BGM.loop = true;  
}

function Gameover(){
    clearInterval(fps);
    Try.style.display = "block";
    sendmemu.style.display = "block";
    con.fillStyle = "red";
    con.font = "40px 'MSゴシック'";
    con.fillText("GameOver",140,35);
    con.font = "20px 'MSゴシック'";
    con.fillText("RANKING",190,55);
    con.fillText("yourscore:"+point,180,190);

    TestClass.order("score", true)
    .limit(5)
    .fetchAll()
        .then(function(results){
        let rank = 0;
        let scoreArray = Array(5);
    for (var i = 0; i < 5; i++) {
        console.log("success!");
        var object = results[i];
        
    if(object!==null){
        rank++;
        scoreArray[i] = object.get("score");
        if(i>0&&scoreArray[i]==scoreArray[i-1]){
            rank--;
                }
        con.font = "15px 'MSゴシック'";
        con.fillText(rank+":"+scoreArray[i]+" ("+object.get("name")+")",180,75+i*20);
                    }
                  }                  
             })
        .catch(function(err){
            console.log("err");
            });
    }

    function transmmition(){
        sendmemu.style.display = "none";
    let Name = document.getElementById("name").value;
    testClass.set("score",point);
    testClass.set("name"," "+Name);         
    testClass.save()
    .then(function(){  
    
      // 保存に成功した場合の処理
    })
    .catch(function(err){
        console.log("eeror!");
      // 保存に失敗した場合の処理
    });
    }

function groundrow(x){
        grx -= x;
    if(grx <= -500){
        grx = 0;
    }
        let image = new Image();
        image.src = "image/ground.png";
        con.drawImage(image,grx,190,1000,50);
}

var counter = 0;

function main(){
con.clearRect(0,0,can.width,can.height);

if(jump == true){
   p.jump();
}

groundrow(o[0].speed);
score();

p.draw();

    if(o[0].x <= -60&&o[2].x <= -60&&o[2].x <= -60){
        
        rraa = Math.round(Math.random()*2);
        console.log(rraa);

    for(let i = 0;i<3;i++){
    o[i].x = can.width+paternX[rraa][i]+ffff;

    console.log("X:",paternX[rraa][i]);
    console.log("OY:",paternOY[rraa][i]);

    o[i].oy = paternOY[rraa][i];
    o[i].y = paternY[rraa][i];
    o[i].ox = paternOX[rraa][i];
    }
}



for(let i=0;i<3;i++){
o[i].move();
o[i].draw();
}

//con.closePath(); 
for(let i=0;i<3;i++){
 if(p.x+p.px/2>o[i].x-o[i].ox/2&&p.x-p.px/2<o[i].x+o[i].ox/2
   &&p.y/*+p.py/2*/ > o[i].y-o[i].oy/2&&p.alive==true){
       console.log("X",p.x+p.px/2,">",o[i].x-o[i].ox/2);
       console.log("Y:",p.y+p.py/2,">",o[i].y-o[i].oy/2);
       console.log("X2:",p.x-p.px/2,"<",o[i].x+o[i].ox/2);
    Gameoverse.play();
    p.alive = false;
    Gameover();
 }
}

}

can.addEventListener("mousedown",function(){
    if(jump==false&&p.alive == true){
    jumpse.play();
    }
 BGM.play();
    jump = true;
    if(point==0){
    start();
    }
});
can.addEventListener("touchstart",function(){
    if(jump==false&&p.alive == true){
    jumpse.play();
       }
    BGM.play();
    jump = true;
    if(point==0){
    start();
    }
});
/*can.addEventListener("mouseup",function(){
 if(p.y <= 130) p.g += 1;
});*/

