import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Board } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
    
		for (var i = 0; i < 10; i++) {
			this.boardMatrixStuff[i] = Array(10).fill(0);
      this.boardMatrixWall[i] = Array(10).fill(0);
		}
    this.boardMatrixStuff[this.currX][this.currY]=9;
    this.boardMatrixStuff[5][5]=1;
    this.boardMatrixWall[5][5]=1;
   }
  board : Board = new Board(10);
  boardMatrixStuff : any[][] = []; 
  boardMatrixWall : any[][] = []; 
  iter: any = Array(100);
  key :any =null;
  currX: any=0;
  currY: any=0;
  stateString:any="ArrowDown";
  charState:string="../../assets/character/downidle.png";
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
      console.log(retValue);
      console.log("Index :  "+ idx);
      console.log("X : "+ xPos);
      console.log("Y : "+ yPos);
    }
    
    return retValue;

  }
  getStuff(idx: number) : number{
    // console.log(idx);
    let xPos:number=Math.floor(idx/10);
    let yPos:number =idx%10;
  
    
    let retValue=this.boardMatrixStuff[xPos][yPos];
    if(retValue==1){
      console.log(retValue);
      console.log("Index :  "+ idx);
      console.log("X : "+ xPos);
      console.log("Y : "+ yPos);
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
      console.log(retValue);
      console.log("Index :  "+ idx);
      console.log("X : "+ xPos);
      console.log("Y : "+ yPos);
    }
    return retValue;

  }
  @HostListener('window:keydown.ArrowLeft', ['$event'])
  @HostListener('window:keydown.ArrowRight', ['$event'])
  @HostListener('window:keydown.ArrowUp', ['$event'])
  @HostListener('window:keydown.ArrowDown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
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
        if(this.currX>0)
          this.movePlayer(this.currX,this.currY,this.currX-1,this.currY);
          this.currX-=1;
      }
      if(this.key=="ArrowLeft"){
        if(this.currY>0)
          this.movePlayer(this.currX,this.currY,this.currX,this.currY-1);
          this.currY-=1;
      }
      if(this.key=="ArrowRight"){
        if(this.currY<9)
          this.movePlayer(this.currX,this.currY,this.currX,this.currY+1);
          this.currY+=1;
      }
    }
  }
  movePlayer(x1:any,y1:any,x2:any,y2:any):void{
    this.boardMatrixStuff[x1][y1]=0;
    this.boardMatrixStuff[x2][y2]=9;
  }
  processMove():void{

  }
}

