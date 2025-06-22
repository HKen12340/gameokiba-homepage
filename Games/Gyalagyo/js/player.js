class Player{
         
            constructor(){
                this.BULLET_NUM = 40;
                this.bullet = Array(this.BULLET_NUM);
                for(var i=0;i<this.BULLET_NUM;i++){
                    this.bullet[i] = new Blett();
                }
                this.py = 300;
                this.px = SWIDTH/2+40;
                this.Width = 60;
                this.Height = 60;
                this.count = 0;
                this.drawcount = 1;
                this.efcount = 0;
                this.Bnburcount = 0;
                this.sconut = 0; 
            }
            
            getBulletNum(){
            for(var i=0;i<this.BULLET_NUM;i++){
                
                if(!this.bullet[i].enter){
                    return i;
                }
            }
            return -1;
            }
            
            shot(bdwon){
                var num;//発射できる弾の番号
                num = this.getBulletNum();
                
            if(num != -1/*&&bdwon==true &&GAMEC == 0||GAMEC == 2&&bdwon==true*/){
              if(this.count>9/*&&GAMEC == 0||GAMEC == 2*/){
                
                //shotSE.play();
                this.bullet[num].onclick(this.px-20+this.Width/2,this.py-this.Width/2,5,20,-Math.PI/2,0,0,12);
                this.bullet[num+1].onclick(this.px+20+this.Width/2,this.py-this.Width/2,5,20,-Math.PI/2,0,0,12);
                //bdwon = false; 
                this.count = 0;
                             
            }
            }
           /*  if(num != -1/*&&bdwon==true&& GAMEC == 1){
           
             if(this.count>30){
          Eshot.play();
                this.bullet[num].onclick(this.px+this.Width/2,this.py,10,10,17.0,2,0,5);
                this.bullet[num+1].onclick(this.px+this.Width/2,this.py,10,10,17.3,2,0,5);
               this.bullet[num+2].onclick(this.px+this.Width/2,this.py,10,10,17.6,2,0,5);
              //  this.sconut++;    
            /*  if(this.sconut >= sangle.length){
                this.sconut = 0;
                bdwon = false;
              }*/
            // } 
            // }
            
            this.count++;
    }

    move(x,y){
        let nextpx = x;
        let nextpy = y;
		
            if(nextpx + this.Width < SWIDTH && nextpx > 0){
            this.px = x;
            }      
            if(nextpy + this.Width < SHEIGHT && nextpy > 0){
            this.py = y;   
      }
    }

            draw(){
                const image = new Image();
                
                if(lefe > 0){
                  if(GAMEC == 0||GAMEC == 2){
                if(this.count%5==0){
                this.drawcount =  this.drawcount*-1;
                }
          image.src = "syuuting/Player/Player"+this.drawcount+".png";
                  }
                  else if(GAMEC == 1){
                    image.src = "syuuting/Enemy/ganner-2.png";
                  }

                con.drawImage(image,this.px,this.py,this.Width,this.Height);
                con.fillStyle = "rgb(255,0,0)";
                for(var i = 0;i < this.BULLET_NUM;i++) {
                if(this.bullet[i].enter){
                this.bullet[i].move();
                this.bullet[i].draw(0);
                 }
                }
                }else if(lefe <= 0){
                  if(this.efcount < 18){  

                 if(this.efcount % 3 == 0){
                                   this.Bnburcount++;
                 }
                  image.src = "syuuting/Banimetion/bonbur"+this.Bnburcount+".png";
                  con.drawImage(image,this.px,this.py,this.Width,this.Height);
                  this.efcount++;
               }else{
                 this.Width = 0;
                 this.Height = 0;
                 this.px = -100;
                 this.py = -100;
               }
             }
            }
        }
