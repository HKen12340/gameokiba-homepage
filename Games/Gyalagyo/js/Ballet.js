 class Blett{
            constructor(){
                this.y = 0;
                this.x = 0;
                this.bwidth = 0;
                this.bheight = 0;
                this.angle = 0;
                this.enter = false;
                this.spd;
                this.guntype = 0;
                this.at2 = 0;
                this.coscount = 0.0025;
               }

            onclick(x,y,bwidth,bheight,angle,guntype,enumber,spd){
                this.angle = angle;//弾の進行角度
                this.enter = true;
                this.y = y;
                this.x = x;
                this.bheight = bheight;
                this.bwidth = bwidth;
                  this.guntype = guntype;
                this.enumber = enumber;
                this.spd =spd;
                this.cosmainace = 1;
                if(GAMEC==2){                
                   this.bheight = 80;
                this.bwidth = 80;
                }
              
            }

            move(){
              switch(this.guntype){              
              case 0:
              case 2:
              case 3:
                this.y += Math.sin(this.angle)*this.spd;//Math.cos()に90を入れると１,270といれると-1が出る
                this.x += Math.cos(this.angle)*this.spd;             
              break;
              case 1:
              this.at2 = Math.atan2(p.py-e[wave][this.enumber].y,p.px-e[wave][this.enumber].x);
               //this.at2 = Math.atan2(p.py-this.y,p.px-this.x);
                this.y += Math.sin(this.at2)*this.spd;//Math.cos()に90を入れると１,270といれると-1が出る             
                this.x += Math.cos(this.at2)*this.spd;
              break;
              case 4:
                this.y += Math.sin(this.angle)*this.spd;//Math.cos()に90を入れると１,270といれると-1が出る
                this.x += Math.cos(this.angle)*this.spd;            
              break;
              case 5:
              this.x -= this.spd * Math.cos(this.angle+this.cosmainace);
                  this.y -= this.spd * Math.sin(this.angle+this.cosmainace);
                  this.cosmainace += 0.03;
                  this.spd += 0.05;                  
              break;     
              case 6:
                  this.x += this.spd * Math.cos(this.angle+this.cosmainace);
                  this.y += this.spd * Math.sin(this.angle+this.cosmainace);
                  this.cosmainace += 0.014;
                  this.spd += 0.005;               
              break;
            
              }

                if(this.y + (this.bheight/2)<0)
                {
                    this.enter = false;
                }
                if(this.y-(this.bheight/2)>SHEIGHT)
                {
                        this.enter = false;
                }
            }
            
            draw(enemytype){
                const image = new Image();
                switch(enemytype){
                case 0:
                  image.src = "syuuting/Bullte/bullte1.png";
                break;
                case 1:
                  image.src = "syuuting/Bullte/bullte2.png";
                break;
                case 2:
                  image.src = "syuuting/Bullte/bullte3.png";
                  break;
                case 3:
                  image.src = "syuuting/Bullte/bullte4.png";
                break;
                case 4:
                  image.src = "syuuting/Bullte/bullte5.png";
                break;
                default:
                  image.src = "syuuting/Bullte/bullte1.png";
                break;
                }
                con.drawImage(image,this.x,this.y,this.bwidth,this.bheight);
            }
        }