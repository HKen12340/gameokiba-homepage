 class Boss{
         constructor(x,y,BSWidth,BSHeight,enemytype){
          this.enemytype = enemytype;
          this.BULLET_NUM = 30; // 敵の最大弾数
          this.bullet = Array(this.BULLET_NUM); // 弾の変数
            for(var i = 0;i <this.BULLET_NUM ;i++) {
			    this.bullet[i] = new Blett();
		    }
            this.BSx = x;
            this.BSy = y;
            this.BSWidth = BSWidth;
            this.BSHeight = BSHeight;
            this.sconut = 0;
            this.Bosshp = 150;
            this.count = 0;
            this.alive = true;
            this.efcount = 0;
            this.Bnburcount = 0;
            this.bangel = 0;
            this.Hpwriai = this.Bosshp/3;
         }
         
         getBulletNum(){
            for(var i=0;i<this.BULLET_NUM;i++){

                if(!this.bullet[i].enter){
                    return i;
                }
              }
            return -1;
            }

        shot(a){
          var num = this.getBulletNum();

          if(this.count % 50 == 0 && this.Bosshp >= this.Hpwriai*2){
                if(num != -1){
                this.bullet[num].onclick(this.BSx+this.BSWidth /2,this.BSy+this.BSHeight,20,20,Math.PI/2,0,a,3);
                }
                this.count = 0;
            }

          if(this.count % 10 == 0 && this.Bosshp < this.Hpwriai*2 &&this.Bosshp >= this.Hpwriai){
            this.bangel -= 10;
                if(num != -1){
                this.bullet[num].onclick(this.BSx+this.BSWidth /2,this.BSy+this.BSHeight,20,20,this.bangel,6,a,2);
                }
                this.count = 0;
            }

          if(this.count % 5 == 0 && this.Bosshp < this.Hpwriai){
            this.bangel -= 200;
                if(num != -1){
                this.bullet[num].onclick(this.BSx+this.BSWidth /2,this.BSy+this.BSHeight,20,20,this.bangel,5,a,2);
                }
                this.count = 0;
            }
            this.count++;
        }

          move(){
            if(this.BSy <= 50)this.BSy++;
          };

      draw(con){
        const image = new Image();
        
        if(this.alive){
          image.src = "syuuting/Enemy/boss.png";
       
       for(var i= 0;i<this.bullet.length;i++){
              if(this.bullet[i].enter){
                this.bullet[i].move();
                this.bullet[i].draw(4);
                }
       }
       con.drawImage(image,this.BSx,this.BSy,this.BSWidth,this.BSHeight);  
       Bosshpber();
        }
         if(this.alive == false){
        if(this.efcount < 18){  
                 if(this.efcount % 3 == 0){
                    this.Bnburcount++;
                 }
        image.src = "syuuting/Banimetion/bonbur"+this.Bnburcount+".png";
        this.efcount++;               
        con.drawImage(image,this.BSx,this.BSy,this.BSWidth,this.BSHeight);
        }else{
                   this.BSx = -3000;
                   this.BSy = -3000;
                   this.BSWidth = 0;
                   this.BSHeight = 0;
            }
         }
      }
    }