import { Component } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { Data } from '../models.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.css']
})
export class AddNewListComponent {
  newData:Data
  constructor( private dataManager:DataManagerService, private router:Router) { 

  }

  addNewList(ev){
    if(ev.target.value.trim() !== ''){
      this.dataManager.addList(ev.target.value.trim())
      ev.target.value='';
    }
  }
  logout(){
    this.router.navigate(['/login']);
  }

}
