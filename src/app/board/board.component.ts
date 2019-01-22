import { Component, OnInit, Input } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { Data, List } from '../models.interface'


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  data:Data;
  
 
  constructor(private dataManager:DataManagerService) { 

  }

  ngOnInit(){
    this.data = this.dataManager.getData()
    //console.log(typeof(this.data))
  }

}
