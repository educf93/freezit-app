import { Component, Input } from '@angular/core';
import { List } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list :List;
  editingName:boolean = false;
  showOptions:boolean = false;
 
  constructor(private dataManager:DataManagerService) { 
    
  }
  delete(id:number,ntareas:number){
    console.log(ntareas)
    if(ntareas >= 1 && confirm('There are tasks in your list. Are you agree with delete this list?')){
      this.dataManager.deleteList(id);
      this.deleteTask(id);
    }else{
      this.dataManager.deleteList(id);
    }
  }
  addNewTask(ev){
    if(ev.target.value.trim() !==''){
      console.log(ev.target.value.trim())
      this.dataManager.addTask(ev.target.value.trim(),this.list)
      ev.target.value = '';
    }
  }
  editNameList(){
    this.editingName = true
  }
  cancelEdit(ev){
    console.log('entro');
    if(ev.target.value.trim() !==''){
      console.log('paso el if');
      this.editingName = false;
      this.changeNameList(ev,ev.target.value);
    }
  }
  changeNameList(ev,text?){
    if(ev.target.value.trim()!==''){
      this.dataManager.changeTitleList(ev.target.value, this.list);
      this.editingName = false;
    }
  }
  options(ev){
    this.showOptions=ev;
  }
  deleteTask(listid){
       this.dataManager.removeTask(listid);
  }
}
