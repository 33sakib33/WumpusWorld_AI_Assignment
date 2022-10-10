import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Board } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
    
		for (var i = 0; i < 10; i++) {
			this.boardMatrix[i] = Array(10).fill({"wall":0,"stuff": 0});
		}
   }
  board : Board = new Board(10);
  boardMatrix : any[][] = []; 
  iter: any = Array(100);

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#EEA47F";
  }
  getWall(idx: number) : number{
    console.log(idx);
    let xPos:any=Math.floor(idx/10);
    let yPos:any =idx%10;
    console.log(xPos);
    console.log(yPos);
    let retValue=this.boardMatrix[xPos][yPos].wall;
    console.log(retValue);
    console.log("hehe");
    return retValue;

  }
}
