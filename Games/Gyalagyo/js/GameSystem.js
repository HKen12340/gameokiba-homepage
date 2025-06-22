 var lefe = 3;
       var stop = 0;
       var Clear = false;
      
        function Bosshpber(){
                con.fillStyle = "rgb(255,0,0)";
                con.font = "16px'MSゴシック'";
                con.fillText("BOSS",30,18);
                con.fillRect(90,10,e[Bosswave][0].Bosshp,10);
       }

        var fps;

        function Gamestart(){
          if(touchcount == 10){
          GAMEC = 1;
          }
          if(touchcount == 15){
          GAMEC = 2;
          }
          document.getElementById("Title").style.display = "none";
          document.getElementById("SBTA").style.display = "none";
          titlebgm.pause();
           bgm.play();
        bgm.loop = true;
       fps = setInterval(main,30);
        }

       function GameOver(){
        if(Clear==false){
         con.fillStyle = "rgb(255,0,0)";
         con.font = "50px'MSゴシック'";
         con.fillText("GAMEOVER",30,200);
   
        document.getElementById("reload").style.display= "block";
        document.getElementById("SBTA").style.display= "none";
        }
      }
var ccount = 0;
          function Gameclear(){        
          con.fillStyle = "rgb(255,225,0)";
          con.font = "50px'MSゴシック'";
          con.fillText("GAMECLEAR",20,200);
          document.getElementById("reload").style.display= "block";
          document.getElementById("SBTA").style.display= "none";

          if(ccount==0)alert("タイトル画面で10回タップしてスタートすると何かが起きるよ！(15回でも可)");
          ccount++;
          }

          function Plefe(lefe){
          con.fillStyle = "rgb(255,225,225)";
          con.font = "15px'MSゴシック'";
          con.fillText("life:",250,45);

          const image = new Image();              
          image.src = "syuuting/Player/Player1.png";

          for(var i = 20;i<=20*lefe;i+=20){
           con.drawImage(image,270+i,35,15,15);
          }
        }

          function Score(score){
          con.fillStyle = "rgb(255,225,0)";
          con.font = "15px'MSゴシック'";
          con.fillText("Score:"+score,170,45);
        }

       