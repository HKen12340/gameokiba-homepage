     class Emeny{
            constructor(x,y,Width,Height,enemytype,movetype){
              this.enemytype = enemytype;
              switch(this.enemytype){// 敵の最大弾数
                case 0:
                this.BULLET_NUM = 1;
                break;
                case 1:
                this.BULLET_NUM = 1;
                break;
                case 2:
                this.BULLET_NUM = 3;
                break;
                case 3:
                this.BULLET_NUM = 3;
                break;
                default:
                this.BULLET_NUM = 0;
                break;
              }
             
            this.bullet = Array(3); // 弾の変数
            for(var i = 0;i < 5;i++) {
			    this.bullet[i] = new Blett();
		    }
                         
                this.x = x;
                this.y = y;
                this.Width = Width;
                this.Height = Height;
                this.alive = true;
                this.count = 0;
                this.dcount = 0;       
                this.sconut = 0;
                this.efcount = 0;
                this.Bnburcount = 0;
                 this.movetype = movetype;
                this.coscount = 0;
		this.hp = 3;
		this.beforehp = this.hp;
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
               
                var num;//発射できる弾の番号
                num = this.getBulletNum();

                switch(this.enemytype){
               
                case 1:        
            if(this.count % 90 == 0){
                if(num != -1){
                   if(this.enemytype == 0)Eshot.play();
               if(this.enemytype == 1)Emisel.play();
                this.bullet[num].onclick(this.x+this.Width/2,this.y,10,10,Math.PI/2,this.enemytype,a,2);
                }
            }
        break;
        case 2:
        if(num != -1){
          Eshot.play();
          //this.image.src = "syuuting/Emeny/ganner2.png";
                this.bullet[num].onclick(this.x+this.Width/2,this.y,10,10,89.3,this.enemytype,a,2);
		this.bullet[num+1].onclick(this.x+this.Width/2,this.y,10,10,89.6,this.enemytype,a,2);
		this.bullet[num+2].onclick(this.x+this.Width/2,this.y,10,10,89.9,this.enemytype,a,2);
                      }
                
                break;
		case 0:
              case 3:
              if(this.count % 20 == 0){
                if(num != -1){
                Eshot.play();
              let at2 = Math.atan2(p.py-this.y,p.px-this.x);
              
              this.bullet[num].onclick(this.x+this.Width/2,this.y,10,10,at2,this.enemytype,a,3);
                }
              }
              break;
              
              default:

              break;
              }

            for(var i=0;i<this.BULLET_NUM;i++){
            	if(this.bullet[i].enter){
				      this.bullet[i].move();
            }
        }

            this.count++;
        }     
    
            move(){
              if(this.enemytype != Bosswave){
                switch(this.movetype){
                 case 0:
                 this.x += 2;
                 this.y += 2;
                 break;
                 case 1:              
                 this.x -= 2;
                 this.y += 2;
                 break;
                 case 2:
                 this.y += 2;
                 break;
                 case 3:
                 this.x += 5 * Math.cos(this.coscount += 0.05);
                 this.y += 1;
                 break;
                 case 4:
                 this.x += 5 * Math.cos(this.coscount += 0.05);
                 this.y += 5* Math.sin(this.coscount += 0.05);
                 this.x += 1;
                 this.y += 1;
                 break;
                 case 5:
                 this.x += 1;
                 break;
                 default:
                 break;                  
                }
              }
                if(this.y > SHEIGHT){
                  console.log(this.y+">"+SHEIGHT+" x:"+this.x);
                    this.alive = false;
                    this.Width = 0;
                    this.Height = 0;
          }
                /*if(this.x < 0){
                    this.alive = false;
                    this.Width = 0;
                    this.Height = 0;
                }
                if(this.x > SWIDTH){
                    this.alive = false;
                    this.Width = 0;
                    this.Height = 0;
                }*/
            }

            draw(con){
                 this.image = new Image();
               if(this.alive){
                switch(this.enemytype){
                  case 0:
                  this.image.src = "syuuting/Enemy/syutter.png"; 
                  break;
                  case 1:                  
                  this.image.src = "syuuting/Enemy/misailar.png"; 
                  break;
                  case 2:
                  this.image.src = "syuuting/Enemy/ganner.png";
                  break;
                  case 3:
                  this.image.src = "syuuting/Enemy/sunepar.png"; 
                  break;
                  default:
                  this.image.src = "syuuting/Enemy/syutter.png";
                  break;
                }
		if(this.hp < this.beforehp&&this.count ==10){
		  this.image.src = "syuuting/Enemy/"+"/damezi1"+".png";
		  this.beforehp = this.hp;
		this.count = 0;
		}
                
                con.drawImage(this.image,this.x,this.y,this.Width,this.Height);
               }else if(this.efcount < 18){  
                 if(this.efcount % 3 == 0){
                  this.Bnburcount++;
                 }
               this.image.src = "syuuting/Banimetion/bonbur"+this.Bnburcount+".png";
               con.drawImage(this.image,this.x,this.y,this.Width,this.Height);
               this.efcount++;
               }else if(this.efcount >= 18){
                 this.Width = 0;
                  this.Height = 0;
                  this.x = -100;
                  this.y = -100;
                  this.efcount = 0;
               }

                for(var i = 0;i < this.BULLET_NUM;i++) {

                if(this.bullet[i].enter){
                this.bullet[i].move();
                this.bullet[i].draw(this.enemytype);
                }
            }
         }            
        }