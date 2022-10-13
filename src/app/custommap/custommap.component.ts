import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BserviceService } from '../bservice.service';

@Component({
  selector: 'app-custommap',
  templateUrl: './custommap.component.html',
  styleUrls: ['./custommap.component.css']
})
export class CustommapComponent implements OnInit {
  public fileInput: any;

  constructor(public router: Router, private srv: BserviceService) {
    
   }
  file:any;
  customInput = false;
  ngOnInit(): void {
  }

  onChange = (event: Event) => {
    const target= event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];

    let fileReader: FileReader = new FileReader();
    
    fileReader.onloadend = (e)=> {
    //  self.fileContent = fileReader.result;
   //  console.log(fileReader.result) ;
   if(fileReader.result){
    const fileContent=fileReader.result.toString();
    console.log(JSON.parse(JSON.stringify(fileContent)));

    this.fileInput = JSON.parse(JSON.stringify(fileContent))
    let board =this.fileInput.split("\n");
    let pit=[];
    let w;
    let agent;
    let coin;
    for(let i=0;i<10;i++){
      for(let j=0;j<10;j++){
        if(board[i][j]=="p"){
          this.srv.pit.push({"x": i, "y":j});
        }
        else if(board[i][j]=="w"){
          w={"x":i,"y":j};
        }
        else if(board[i][j]=="g"){
          coin={"x":i,"y":j};
        }
        else if(board[i][j]=="a"){
          agent={"x":i,"y":j};
        }
        
      }
     
    }
    this.srv.setCoin(coin);
    this.srv.setWumpus(w);
    this.srv.setagent(agent);
    this.srv.rand=true;
    this.router.navigate(["gameMenu"]);
   }
    }
    fileReader.readAsText(this.file);
    this.customInput = true;
  };

}
