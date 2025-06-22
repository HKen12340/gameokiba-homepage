//データベース関連
var ncmb = new NCMB("","");
var Harowin = ncmb.DataStore("harowin");
var harowin = new Harowin();

//ゲーム関連
var can = document.getElementById("can");
var con = can.getContext("2d");
var jump = false;
var point = 0;
var ffff = 0;
var Gamestart = false;

var panpukin = 6;

//音源関連
var jumpse = document.getElementById("jump");
var Gameoverse = document.getElementById("gameover");
var BGM = document.getElementById("BGM");
var candyse = document.getElementById("candy");

//UI関連
var Try = document.getElementById("trybotton");
var sendmemu = document.getElementById("sendmemu");

var idou1 = document.getElementById("idou1");
var idou2 = document.getElementById("idou2");

var ostart = 0;
//プレイヤークラス
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
	this.keyA = false;
	this.keyD = false;
    }

jump(){//プレイヤージャンプ
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

idou(){//プレイヤー横操作
if(this.keyA == true&&this.x-10>0)this.x -= 10;
if(this.keyD == true&&this.x+30<can.width)this.x += 10;
}
    
draw(){//プレイヤー描画
let image = new Image();
 if(jump)image.src = "image/gaigotu-1.png";
  else {
     if(this.keyD==true)image.src = "image/gaigotu"+this.a+".png";
     if(this.keyA==true)image.src = "image/gaigotuS"+this.a+".png";
     if(this.Acount % 3== 0){
     this.a *= -1;
     this.Acount = 0; 
     }
 else if(this.keyA==false&&this.keyD==false){
  image.src = "image/gaigotu.png";
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

//カボチャクラス
class Obstacle{
    constructor(ox,oy,x,y){
        this.ox = ox;
        this.oy = oy;
        this.x = x;
        this.y = y;
        this.speed = 8;
    }

move(){//カボチャ落下
    
    this.y += this.speed;
}

draw(){//カボチャ描画

let image = new Image();
image.src = "image/jack-o-rantan.png";
con.drawImage(image,this.x,this.y,this.ox,this.oy);

}
}

//キャンディークラス
class candy{
    constructor(ox,oy,x,y){
        this.ox = ox;
        this.oy = oy;
        this.x = x;
        this.y = y;
        this.speed = 9;
	this.candy = true;
    }

move(){//キャンディー落下
    
    this.y += this.speed;
}

draw(){//キャンデー描画

let image = new Image();
image.src = "image/candy.png";
if(this.candy==true)con.drawImage(image,this.x,this.y,this.ox,this.oy);

}
}


//スコア表示
function score(){
   con.fillStyle = "yellow";
　   con.font = "20px'MSゴシック'";
   con.fillText("score:"+point,can.width-120,30);

   /*if(point%100 == 0){
       for(let i=0;i<o.length;i++){
   o[i].speed += 3;
   ffff += 100;
       }
   grnx += 3;
   }*/

}

var fps;

//インスタンス作成
var p = new Player(50,50,60,140,-23,2);
var c = new candy(30,30,20,-50);
var o = Array(panpukin);
for(let i=0;i<o.length;i++){//障害物インスタンスの生成
 o[i] = new Obstacle(30,60,100+20*i,250,i);
}

//障害物情報 Y = Y座標,OY = 障害物の立幅,OX = 障害物の横幅,X = X座標


var paternOY = [[30,30,30,30,30,30],
               [50,30,60,30],
               [30,90,80,50],
		[30,50,40,60,70]];

var paternOX = [[20,30,40,50,60,70],
                [50,50,20,30],
                [30,35,30,30],
		[50,50,30,50]];

var paternY = [[10,10,-30,10,-30,10],
               [10,-10,10,10],
               [10,-50,10,10],
		[10,-50,10,-30],
               [10,-10,-30,-50]];

var paternX = [[100,200,300,400,500,600],
               [100,150,200,300],
               [50,105,200,250],
		[100,250,300,350,400,450],
		[40,70,100,130,170,200]
];

var cpaternX = [100,250,380,290,160,230,300];

               

let grx = 0;
let grnx = 9;

//ゲームスタート処理
function start(){      
    can.style.backgroundImage = 'url(image/haikei.png)'; 
    fps = setInterval(main,50);
    BGM.loop = true;  
}

//ゲームオーバー処理
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

//データベースのスコア情報を降順に並べ替え、上位5位を表示
    Harowin.order("score", true)
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

//スコア送信関数
    function transmmition(){
    /*    sendmemu.style.display = "none";
    let Name = document.getElementById("name").value;
    harowin.set("score",point);
    harowin.set("name"," "+Name);         
    harowin.save()
    .then(function(){  
    
      // 保存に成功した場合の処理
    })
    .catch(function(err){
        console.log("eeror!");
      // 保存に失敗した場合の処理
    });*/
    }

/*function groundrow(x){
        grx -= x;
    if(grx <= -500){
        grx = 0;
    }
        let image = new Image();
        image.src = "image/ground.png";
        con.drawImage(image,grx,190,1000,50);
}*/

var counter = 0;

function main(){

con.clearRect(0,0,can.width,can.height);

if(jump == true){
   p.jump();
}
p.idou();
//groundrow(o[0].speed); //地面アニメーション
score();

p.draw();


c.draw();
c.move();

ostart++;
//障害物の再配置
    if(o[0].y >= 250 && ostart > 20){
        
        rraa = Math.round(Math.random()*4);
console.log(cpaternX[rraa]);

    for(let i = 0;i<o.length;i++){
    o[i].x = paternX[rraa][i];


    o[i].oy = paternOY[rraa][i];
    o[i].y = paternY[rraa][i];
    o[i].ox = paternOX[rraa][i];
    }
}
	if(c.y >= 250||c.candy==false){
	 c.y = 10;
	 c.x = cpaternX[rraa] ;
	 c.candy = true;
 }

for(let i=0;i<o.length;i++){
o[i].move();
o[i].draw();
}

//con.closePath(); 

//プレイヤーと障害物の当たり判定
for(let i=0;i<o.length;i++){
 if(p.x+p.px/2>o[i].x-o[i].ox/2&&(p.x-p.px/2)+20<o[i].x+o[i].ox/2
   &&p.y/*+p.py/2*/ > o[i].y-o[i].oy/2&&p.y/*+p.py/2*/ < o[i].y+o[i].oy/2&&p.alive==true){      
    Gameoverse.play();
    p.alive = false;
    Gameover();
 }
}

//プレイヤーとキャンディーの当たり判定
for(let i=0;i<3;i++){
 if(p.x+p.px/2>c.x-c.ox/2&&p.x-p.px/2<c.x+c.ox/2
   &&p.y/*+p.py/2*/ > c.y-c.oy/2&&p.y/*+p.py/2*/ < c.y+c.oy/2&&p.alive==true){
	if(c.candy == true){
	point += 10;
	candyse.play();
}
	c.candy = false;
 }
}

}

//マウス操作
can.addEventListener("mousedown",function(){
    if(jump==false&&p.alive == true){
    jumpse.play();
    }
 BGM.play();
    jump = true;
    if(Gamestart ==false){
	Gamestart = true;
    start();
    }
});
//タッチ操作
can.addEventListener("touchstart",function(){
    if(jump==false&&p.alive == true){
    jumpse.play();
       }
    BGM.play();
    jump = true;
    if(Gamestart ==false){
     Gamestart = true;
     start();
    }
});
document.body.addEventListener('keydown',
    event => {
        if (event.key === 'a') {
          p.keyA = true;
        }
    });
document.body.addEventListener('keyup',
    event => {
        if (event.key === 'a') {
          p.keyA = false;
        }
    });

document.body.addEventListener('keydown',
    event => {
        if (event.key === 'd') {
          p.keyD = true;
        }
    });

document.body.addEventListener('keyup',
    event => {
	        if (event.key === 'd'){
         p.keyD = false;
	}
    });

idou1.addEventListener("touchstart", function(event) {
 p.keyA = true;
});
idou1.addEventListener("touchend", function(event) {
 p.keyA = false;
});

idou2.addEventListener("touchstart", function(event) {
 p.keyD = true;
});

idou2.addEventListener("touchend", function(event) {
 p.keyD = false;
});


//入力の長さによって跳ぶ高さが変わる
/*can.addEventListener("mouseup",function(){
 if(p.y <= 130) p.g += 1;
});*/


