let points = [[1,-3],[5,-4],[4,-3],[9,1],[7,2],[8,5],[5,4],[5,5],[3,4],[4,9],[2,7],[0,10],[-2,7],[-4,8],[-3,3],[-5,6],[-5,4],[-8,5],[-7,2],[-9,1],[-4,-3],[-5,-4],[0,-3],[2,-7],[2,-6],[1,-3]]
var colors = "E6C3C3-BC8F8F-E6E6FA-B0C4DE-D3D3D3".split("-").map(a=>"#"+a)
var stroke_colors = "000000".split("-").map(a=>"#"+a)
var ball 
var balls = [] 
var score = 0
var bullet
var bullets = []
function setup(){
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<20;j++){
    ball = new Obj({}) 
    balls.push(ball) //把ball物件放到balls物件群(陣列)中
  }
}

function draw() {
  background(220);
  for(let ball of balls){ //針對陣列變數，取出陣列內的每個物件
    ball.draw()
    ball.move()
    //由此判斷每隻大象有沒有接觸到飛彈
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //判斷ball與bullet有沒有接觸
        score = score+1
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  }
  for(let bullet of bullets){ //針對陣列變數，取出陣列內的每個物件
    bullet.draw()
    bullet.update()
  }
  push()    
    fill(0)
    rect(45,10,133,45)
  pop()
  rect(45,55,133,50)
  textSize(50)
  push()
  textSize(45)
    fill(255)  
    text("score",57,45)
  pop()
  text(score,95,98)
  push() //砲台
    let dx = mouseX-width/2 //滑鼠座標到中心座標x的距離
    let dy = mouseY-height/2 //滑鼠座標到中心座標y的距離
    let angle = atan2(dy,dx) //利用反tan算出角度
    translate(width/2,height/2)
    // let angle = atan2(mouseY,mouseX)
    rotate(angle)
    fill(200) 
    fill("#F5DEB3")
    triangle(75,0,-15,-25,-15,25)
    fill("#DEB887")
    ellipse(0,0,20)
  pop()
}
function mousePressed(){  
  // for(let ball of balls){//當滑鼠按下物件時消失
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     score = score+1
  //     balls.splice(balls.indexOf(ball),1) //把陣列內編號第幾個刪除，只刪除1個(indexOf()找出ball的編號
  //   }
  // }
  bullet = new Bullet({})
  bullets.push(bullet)
}
// function mousePressed(){ //當滑鼠按下產生一個物件
//   ball = new Obj({
//     p:{x: mouseX,y:mouseY}
//   })
//   balls.push(ball)
// }

class Obj{
  constructor(args){ 
    this.p = args.p || {x:random(width),y:random(height)} 
    this.v = {x:random(-1,1),y:random(-1,1)} 
    this.size = random(3,10) 
    this.color = random(colors) 
    this.stroke = random(stroke_colors) 
  }
  draw(){//把物件畫出來
    push()
    translate(this.p.x,this.p.y)
    scale((this.v.x<0?1:-1),-1) 
    fill(this.color)
    stroke(this.stroke)
    beginShape()
    for(var i=0;i<points.length-1;i++){
      // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
      vertex(points[i][0]*this.size,points[i][1]*this.size)
    }
    endShape()
    pop()
  }
  move(){ //讓物件移動
    this.p.x = this.p.x + this.v.x
    this.p.y = this.p.y + this.v.y
    if(this.p.x<=0 || this.p.x>=width){ //<=0碰到左邊，>width碰到右邊
      this.v.x = -this.v.x //碰到後速度改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //<=0碰到下面，>=碰到上面
      this.v.y = -this.v.y
    }
  }
  isBallInRanger(x,y){
    let d = dist(x,y,this.p.x,this.p.y) 
    if(d/this.size<5.5){ 
      return true 
    }
    else{
      return false 
    }
  }
}

class Bullet{
  constructor(args){ 
      this.r = args.r || 10
      this.p = args.p || createVector(width/2,height/2)
      this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10) //飛彈的速度
      this.color = args.color || "red" //飛彈的顏色
  }
  draw(){ //劃出飛彈
      push()
          translate(this.p.x,this.p.y)
          fill(this.color)
          noStroke()
          ellipse(0,0,this.r)
      pop()
  }
  update(){ 
      this.p.add(this.v)
  }

}