import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Board } from './board';
import { Pair } from './pair';
declare var require: any
var PriorityQueue = require('priorityqueuejs');

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
// 1: wumpus, 2:hole, 3:coin, 4:smell. 5: wind, 9: character
export class BoardComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
    
		for (var i = 0; i < 10; i++) {
			this.boardMatrixStuff[i] = Array(10).fill(0);
      this.boardMatrixWall[i] = Array(10).fill(0);
      this.boardMatrixSmell[i] = Array(10).fill(0);
      this.boardMatrixWind[i] = Array(10).fill(0);
      let noParent = new Pair()
      noParent.First = -1
      noParent.Second = -1
      this.parent[i] = Array(10).fill(noParent);
		}
    this.boardMatrixStuff[this.currX][this.currY]=9;
    this.boardMatrixStuff[5][5]=1;
    this.boardMatrixStuff[3][7]=2;
    this.boardMatrixWall[5][5]=1;
    this.boardMatrixStuff[3][3]=3;
   }


  compareNumbers = function(a : Pair, b : Pair) { 
    if(a.First.First==b.First.First) {
      return a.First.Second - b.First.Second;
    }
    return a.First.First - b.First.First; 
  };
  queue = new PriorityQueue(this.compareNumbers);

  wumpus:any=1;
  knowledgeBase:any[]=[];
  attack:any=1;
  coin:any=0;
  score:any=0;
  moveX:any[]=[0,1,-1,0];
  moveY:any[]=[1,0,0,-1];
  
  board : Board = new Board(10);
  boardMatrixStuff : any[][] = []; 
  boardMatrixWall : any[][] = []; 
  boardMatrixWind : any[][] = []; 
  boardMatrixSmell : any[][] = [];
  parent : any[][] = []; 
  iter: any = Array(100);
  key :any =null;
  currX: any=0;
  currY: any=0;
  stateString:any="ArrowDown";
  charState:string="../../assets/character/downidle.png";
  // coinPath:string="../../assets/character/coin.png";
  charStateList:any={"downIdle": "../../assets/character/downidle.png", 
  "leftIdle": "../../assets/character/leftidle.png",
  "upIdle": "../../assets/character/upidle.png",
  "rightIdle": "../../assets/character/rightidle.png"}

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#EEA47F";
  }
  getWall(idx: number) : number{
    // console.log(idx);
    let xPos:number=Math.floor(idx/10);
    let yPos:number =idx%10;
  
    
    let retValue=this.boardMatrixWall[xPos][yPos];
    if(retValue==1){
      // console.log(retValue);
      // console.log("Index :  "+ idx);
      // console.log("X : "+ xPos);
      // console.log("Y : "+ yPos);
    }
    
    return retValue;

  }
  getStuff(idx: number) : number{
    // console.log(idx);
    let xPos:number=Math.floor(idx/10);
    let yPos:number =idx%10;
  
    
    let retValue=this.boardMatrixStuff[xPos][yPos];
    if(retValue==1){
      // console.log(retValue);
      // console.log("Index :  "+ idx);
      // console.log("X : "+ xPos);
      // console.log("Y : "+ yPos);
    }
    if(this.boardMatrixWall[xPos][yPos]!=0)return 0;
    return retValue;

  }
  getStuff2(idx: number) : number{
    // console.log(idx);
    let xPos:number=Math.floor(idx/10);
    let yPos:number =idx%10;
  
    
    let retValue=this.boardMatrixStuff[xPos][yPos];
    if(retValue==1){
      // console.log(retValue);
      // console.log("Index :  "+ idx);
      // console.log("X : "+ xPos);
      // console.log("Y : "+ yPos);
    }
    return retValue;

  }
  @HostListener('window:keydown.ArrowLeft', ['$event'])
  @HostListener('window:keydown.ArrowRight', ['$event'])
  @HostListener('window:keydown.ArrowUp', ['$event'])
  @HostListener('window:keydown.ArrowDown', ['$event'])
  @HostListener('window:keydown.Space',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event.key);
    this.key = event.key;
    if(this.key==" "){
      this.useAttack();
      console.log("herer");
      console.log(    this.boardMatrixStuff[5][5]        );
      console.log(this.stateString);
      return;
    }
    if(this.key!=this.stateString){
      this.stateString=this.key;
      if(this.key=="ArrowDown"){
        this.charState=this.charStateList["downIdle"];
      }
      if(this.key=="ArrowUp"){
        this.charState=this.charStateList["upIdle"];
      }
      if(this.key=="ArrowLeft"){
        this.charState=this.charStateList["leftIdle"];
      }
      if(this.key=="ArrowRight"){
        this.charState=this.charStateList["rightIdle"];
      }
    }
    else{
      if(this.key=="ArrowDown"){
        if(this.currX<9){
          this.movePlayer(this.currX,this.currY,this.currX+1,this.currY);
          this.currX+=1;
        }
         
      }
      if(this.key=="ArrowUp"){
        if(this.currX>0){
          this.movePlayer(this.currX,this.currY,this.currX-1,this.currY);
          this.currX-=1;
        }
      }
      if(this.key=="ArrowLeft"){
        if(this.currY>0){
          this.movePlayer(this.currX,this.currY,this.currX,this.currY-1);
          this.currY-=1;
        }
      }
      if(this.key=="ArrowRight"){
        if(this.currY<9){
          this.movePlayer(this.currX,this.currY,this.currX,this.currY+1);
          this.currY+=1;
        }
      }

      let source = new Pair()
      source.First = this.currX
      source.Second = this.currY
      this.bfs(source)
    }
    console.log("pos: "+ this.currX);
    console.log("pos: "+ this.currY);
  }
  movePlayer(x1:any,y1:any,x2:any,y2:any):void{
    this.boardMatrixStuff[x1][y1]=0;
    this.boardMatrixStuff[x2][y2]=9;
  }
  processMove():void{

  }
  processAdjacent():void{
    for(let i=0;i<10;i++){
      for(let j=0;j<10;j++){
        
        this.updateAdjacent(i,j,this.boardMatrixStuff[i][j]);
        
      }
    }
  }
  updateAdjacent(x:any, y:any,type:any):void{
    for(let i=0;i<4;i++){
      let newX=x+this.moveX[i];
      let newY=y+this.moveY[i];
      if(Math.min(newX,newY)>=0 && newX<10 && newY<10){
        if(type==1){
          this.boardMatrixSmell[newX][newY]+=1;
        }
        if(type==2){
          this.boardMatrixWind[newX][newY]+=1;
        }
      }
    }
    
  }
  useAttack():void{
    if(this.stateString=="ArrowRight"){
      for(let i=this.currY+1;i<10;i++){
        if(this.boardMatrixStuff[this.currX][i]==1){
          this.wumpus=0;
          this.boardMatrixStuff[this.currX][i]=0;
          this.cleanSmell(this.currX,i);
        }
      }
    }

    else if(this.stateString=="ArrowLeft"){
      for(let i=this.currY-1;i>=0;i--){
        if(this.boardMatrixStuff[this.currX][i]==1){
          this.wumpus=0;
          this.boardMatrixStuff[this.currX][i]=0;
          this.cleanSmell(this.currX,i);

        }
      }
    }

    else if(this.stateString=="ArrowDown"){
      for(let i=this.currX+1;i<10;i++){
        if(this.boardMatrixStuff[i][this.currY]==1){
          this.wumpus=0;
          this.boardMatrixStuff[i][this.currY]=0;
          this.cleanSmell(i,this.currY);

        }
      }
    }

    else if(this.stateString=="ArrowUp"){
      for(let i=this.currX-1;i>=0;i--){
        if(this.boardMatrixStuff[i][this.currY]==1){
          this.wumpus=0;
          this.boardMatrixStuff[i][this.currY]=0;
          this.cleanSmell(i,this.currY);

        }
      }
    }
  }
  cleanSmell(x:any, y:any):void{
    for(let i=0;i<4;i++){
      let newX=x+this.moveX[i];
      let newY=y+this.moveY[i];
      if(Math.min(newX,newY)>=0 && newX<10 && newY<10){
        this.boardMatrixSmell[newX][newY]=this.boardMatrixSmell[newX][newY]-1;
        console.log(this.boardMatrixSmell[newX][newY]);
      }
    }
  }
  
  bfs(source : any){
      let visited: boolean[][] = [];
      //var size = this.board.getBoardSize();
      var size = 10;
      // Pre-populate array:
      for(let i = 0; i < size; i++){
        visited[i] = Array(size).fill(false);
        this.parent[i].splice(0)
        let noParent = new Pair()
        noParent.First = -1
        noParent.Second = -1
        this.parent[i] = Array(10).fill(noParent);
      }
  
       // Use an array as our queue representation:
       let q: Pair[] = [];
       let sourceX = source.First
       let sourceY = source.Second
       visited[sourceX][sourceY] = true;
       
       let source_cost = new Pair()
       source_cost.First = source
       source_cost.Second = 0
       q.push(source_cost);
  
       while(q.length > 0){
           const v = q.shift();
           console.log(v?.First.First, v?.First.First)
           for(let i=0; i<4; i++){
                
                let x = this.moveX[i]
                let y = this.moveY[i]
                let adjX = v?.First.First+x
                let adjY = v?.First.Second+y
                if(adjX>=10 || adjY>=10) continue
                
                this.parent[adjX][adjY] = v?.First
                let newNode = new Pair()
                newNode.First = adjX
                newNode.Second = adjY
                
                let cost = v?.Second+1                
                let risk_score = this.getScore(adjX, adjY)


                let score_cost = new Pair()
                score_cost.First = risk_score
                score_cost.Second = cost

                if(visited[adjX][adjY] == false){
                    visited[adjX][adjY] = true;
                    if(this.boardMatrixWall[adjX][adjY] == 0){
                      console.log(adjX, adjY)
                      let score_cost_vertex = new Pair()
                      score_cost_vertex.First = score_cost
                      score_cost_vertex.Second = newNode
                      this.queue.enq(score_cost_vertex)
                      continue
                    }
                    let toAdd = new Pair()
                    toAdd.First = newNode
                    toAdd.Second = cost
                    q.push(toAdd);
                }
           }
       }
  }
  
  bestMove(): Pair{
    return this.queue.deq();
  }

  getScore(x : number, y:number) : number{
    // let score = 0
    // for(let i=0; i<4; i++){
    //   let adjX = x + this.moveX[i]
    //   let adjY = y + this.moveY[i]
    //   if(this.boardMatrixSmell[adjX][adjY]==1){
    //     let count = 0
    //     for(let j=0; j<4; j++){
    //       let X = adjX + this.moveX[j]
    //       let Y = adjY + this.moveY[j]
    //       if(X==x && Y==y) continue
    //       if(this.boardMatrixWall[X][Y]!=0) count += 1
    //     }
    //     if(count==3) score += 100
    //     else score += 10
    //   }

    //   if(this.boardMatrixWind[adjX][adjY]==1){
    //     let count = 0
    //     for(let j=0; j<4; j++){
    //       let X = adjX + this.moveX[j]
    //       let Y = adjY + this.moveY[j]
    //       if(X==x && Y==y) continue
    //       if(this.boardMatrixWall[X][Y]!=0) count += 1
    //     }
    //     if(count==3) score += 100
    //     else score += 10
    //   }

    // }
    // return -score
    return 100
  }

  travel(source : Pair, dest : Pair){
    let path : Pair[] = []
    let cur = dest
    path.push(cur)
    while(cur.First!=source.First && cur.Second!=source.Second){
      cur = this.parent[cur.First][cur.Second]
      path.push(cur)
    }
  }
}






