import { Injectable } from '@angular/core';
import { Data,Task, List } from './models.interface';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class DataManagerService {
  data: Data = {arrayList:[]};
  constructor(private api:ApiService, private router:Router){
    
  }
  loadDataFromBackend() {
    this.api
      .getLists()
      .then((rawLists: Array<any>) => {
        console.log(rawLists);
        const lists = rawLists.map(rawList => ({
          listId: rawList.id,
          createdAt: rawList.createdAt,
          modifiedAt: rawList.updatedAt,
          name: rawList.name,
          tasks: [],
        }));
        Promise.all(
          lists.map(async (list: List) => {
            list.tasks = await this.api.getTasks(list.listId);
            list.tasks = list.tasks.map((rawTask: any) => ({
              listId: rawTask.idlist,
              taskId: rawTask.id,
              text: rawTask.task,
              completed: false,
              color: 'white',
              createdAt: new Date(rawTask.createdAt),
              modifiedAt: new Date(rawTask.updatedAt),
            }));
            return list;
          }),
        ).then(lists => {
          this.data.arrayList = lists;
          console.log(this.data.arrayList)
        });
      })
      .catch()///this.router.navigate(['/login']))//
  }
  getData(){
    this.loadDataFromBackend();
    return this.data;
  }

  addList(text:string){
    //const newList = {
    //listId: Date.now(),
    //createdAt:  new Date(),
    //modifiedAt: new Date(),
    //name: text,
   // tasks:Array<Task>()
    //}
    //console.log(JSON.stringify(newList))
    //this.data.arrayList.push(newList)
    this.api.newList(text).then(() =>
    this.loadDataFromBackend())
  }
  deleteList(listId){
    //this.data.arrayList = this.data.arrayList.filter(item => item.listId !== listId)
    this.api.deleteList(listId).then(() => this.loadDataFromBackend())
  }

  addTask(text:string,list: List){
    // const newTask:Task = {
    //   listId: list.listId,
    //   taskId: Date.now(),
    //   text: text,
    //   completed: false,
    //   color: 'white',
    //   createdAt: new Date(),
    //   modifiedAt: new Date(),
    // }
    // this.data.arrayList = this.data.arrayList.map(listObj =>{
    //   if(listObj.listId === list.listId)
    //   {
    //     listObj.tasks.push(newTask)
    //   }
    //   return listObj
    // })
    //console.log(JSON.stringify(this.data.arrayList))
    this.api.newTask(text,list.listId)
    .then(()=>this.loadDataFromBackend())
    .catch(()=>{console.error('Error al añadir')})
  }
  removeTask(listid){
    // this.data.arrayList = this.data.arrayList.map(objList =>{
    //    if(objList.listId === task.listId){
    //     objList.tasks = objList.tasks.filter(objTask => objTask.taskId !== task.taskId)
    //    }
    //    return objList
    //  });
    console.log(listid)
    this.api.deleteTasks(listid).catch(()=>this.loadDataFromBackend())
    
  }
  changeTitleList(name,list:List){
    // this.data.arrayList = this.data.arrayList.map(objList =>{
    //     if(objList.listId === list.listId){
    //       objList.name = name 
    //     }
    //   return objList;
    // })
    // console.log(JSON.stringify(this.data.arrayList))
    this.api.editNameList(name,list.listId).then(()=>
      this.loadDataFromBackend());
  }
  editTaskTitle(task:Task,newTaskName){
    // this.data.arrayList = this.data.arrayList.map(listObj =>{
    //   if(listObj.listId === task.listId){
    //     listObj.tasks.map(taskObj =>{
    //       if(taskObj.taskId === task.taskId){
    //         taskObj.text = newTaskName
    //       }
    //       return taskObj
    //     })
    //     return listObj
    //   }
    // })
    this.api.editTaskName(task.listId,newTaskName).then(()=>this.loadDataFromBackend)
  }
}
