import { Component,Input } from '@angular/core';
import { Task } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task:Task
  editingTaskName = false;
  constructor(private dataManager:DataManagerService) { 
    
  }
  
  editTaskName(ev){
    this.dataManager.editTaskTitle(this.task,ev.target.value)
    this.editingTaskName = false
  }
  edit(){
    this.editingTaskName=true

  }
  

}
