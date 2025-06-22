var xp=0, yp=0, L, T; 
function main(){
            con.clearRect(0,0,SWIDTH,SHEIGHT);
            for(var i=0;i<e[wave].length;i++){
              e[wave][i].draw(con);
            if(e[wave][i].alive == true){
            e[wave][i].move();
            e[wave][i].shot(i);
            } else if(e[wave][i].alive == false && e[wave][i].dcount == 0){              
             ekill++;           
            e[wave][i].dcount = 1;
                }

            if(ekill>=esterts[wave].length){
                stop++;
            if(stop > 100 && lefe > 0){
            wave++;
            ekill = 0;
            stop = 0;
              }
            }
          }


function bgGo(){ 
xp+=0; yp+=3; L=xp+"px"; T=yp+"px"; 
can.style.backgroundPosition=L+" "+T; 
}
bgGo();

            p.draw();
            if(lefe > 0)
            {
            p.shot();
            
            }else{
              GameOver();
            }

            Plefe(lefe);
            Score(score);
            if(Clear)Gameclear();
          
                for(var i=0;i<p.BULLET_NUM;i++){
                if(p.bullet[i].enter){
                //プレイヤーの弾と敵の当たり判定
                for(var m = 0;m<e[wave].length;m++){
            
                if(p.bullet[i].y-(p.bullet[i].bheight/2) < (e[wave][m].y + e[wave][m].Height/2) && p.bullet[i].y + (p.bullet[i].bheight/2) > (e[wave][m].y - e[wave][m].Height/2)
                && p.bullet[i].x+p.bullet[i].bwidth/2 > e[wave][m].x - e[wave][m].Width/4 
                && p.bullet[i].x + p.bullet[i].bwidth/2 < e[wave][m].x+e[wave][m].Width){
                  shottruckSE.play();
                  p.bullet[i].enter = false;
                  e[wave][m].hp += -1;
                  if(e[wave][m].hp <= 0){
                  e[wave][m].alive = false;
                  score += 100;
                  shottruckSE.play();
                  }
                }
              }
            }
          }

                //プレイヤーと敵の弾の当たり判定
         
                for(var m = 0;m < e[wave].length;m++){
                for(var i=0;i<e[wave][m].BULLET_NUM;i++){
                    if(e[wave][m].bullet[i].enter){
                    if(e[wave][m].bullet[i].y + e[wave][m].bullet[i].bheight/2 > p.py - e[wave][m].Height/2 && p.py + p.Height > e[wave][m].bullet[i].y - e[wave][m].bullet[i].bheight/2 
                    && e[wave][m].bullet[i].x + e[wave][m].bullet[i].bwidth/3 > p.px - p.Width/6 && p.px + p.Width > e[wave][m].bullet[i].x - e[wave][m].bullet[i].bwidth/2
                ){
                    e[wave][m].bullet[i].enter = false; 
                    lefe -= 1;
                    shottruckSE.play();
                    }
                }
            }
                }
           
            for(var m = 0;m < e[wave].length;m++){
            if(e[wave][m].y + e[wave][m].Height/2 > p.py - p.Height/2 && e[wave][m].y - e[wave][m].Height/2 < p.py + p.Height/2 
            && e[wave][m].x + e[wave][m].Width/2 > p.px - p.Width/2 && e[wave][m].x - e[wave][m].Width/2 < p.px + p.Width/2
            && lefe >0){
             lefe -= 1 ;
           }
            }

          for(var i=0;i<p.BULLET_NUM;i++){
                if(p.bullet[i].enter){
                //プレイヤーの弾とBOSSの当たり判定
                for(var m = 0;m<e[wave].length;m++){
            
                if(p.bullet[i].y-(p.bullet[i].bheight/2) < (e[wave][m].BSy + e[wave][m].BSHeight/2) && p.bullet[i].y + (p.bullet[i].bheight/2) > (e[wave][m].BSy - e[wave][m].BSHeight/2)
                && p.bullet[i].x+p.bullet[i].bwidth/2 > e[wave][m].BSx - e[wave][m].BSWidth/4 
                && p.bullet[i].x + p.bullet[i].bwidth/2 < e[wave][m].BSx+e[wave][m].BSWidth&&Clear==false){
                  
                   p.bullet[i].enter = false; 
                   
                   if(e[wave][m].Bosshp <= 1)
                   {                                    
                     score += 1000;
                     Ebonber.play();
                    e[Bosswave][0].alive = false;                
                    Clear = true;
                    Gameclear();
               }else {
                 shottruckSE.play();
                     e[wave][m].Bosshp -= 1;
                     }
                    
                }
              }
            }
          }

           for(var m = 0;m < e[wave].length;m++){
             //プレイヤーとBOSSの弾の当たり判定
                for(var i=0;i<e[wave][m].BULLET_NUM;i++){
                    if(e[wave][m].bullet[i].enter){
                    if(e[wave][m].bullet[i].y + e[wave][m].bullet[i].bheight/2 > p.py /*- e[wave][m].BSHeight/2*/ && p.py + p.Height/2 > e[wave][m].bullet[i].y - e[wave][m].bullet[i].bheight/2 
                    && e[wave][m].bullet[i].x + e[wave][m].bullet[i].bwidth/3 > p.px - p.Width/3 && p.px + p.Width/2 > e[wave][m].bullet[i].x - e[wave][m].bullet[i].bwidth/2
                && lefe > 0&&Clear==false){
                    e[wave][m].bullet[i].enter = false;
                    lefe -= 1;
                           shottruckSE.play();
                    }
                }
            }
                }
                
    if(wave == Bosswave){
            if(e[Bosswave][0].BSy + e[Bosswave][0].BSHeight/2 > Math.floor(p.py - p.Height/2) && e[Bosswave][0].BSy - e[Bosswave][0].BSHeight/2 < Math.floor(p.py + p.Height/2) 
            && e[Bosswave][0].BSx + e[Bosswave][0].BSWidth > Math.floor(p.px+p.Width/2) && e[Bosswave][0].BSx - e[Bosswave][0].BSWidth/2 < Math.floor(p.px - p.Width/2)
            &&lefe >0 &&Clear==false){
              shottruckSE.play();
              lefe -= 1;
           }
    }
        }

          