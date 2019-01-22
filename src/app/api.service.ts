import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwt:string;
  constructor(private http:HttpClient) { }

  registerUser(username:string,password:string){
    const body = {username,password}
    return this.http.post('https://apitrello.herokuapp.com/users',body).toPromise();

  }
  loginUser(username:string,password:string){
    const body = {username,password}
    return new Promise((resolve,reject) =>{
    this.http.post('https://apitrello.herokuapp.com/users/login',body)
    .toPromise().then(result =>{
      reject('User not found');
    })
    .catch(maybeNotanError =>{
      const jwt = maybeNotanError.error.text;
      
      if(maybeNotanError.status === 200){
        resolve(200);
        this.jwt = jwt;
        console.log(this.jwt)
      }else if(maybeNotanError.status === 401){
        reject('Wrong password');
      }else{
        reject('The username does not exist');
      }
    });
  });
  }
  getLists():any{
    const opt = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.get('https://apitrello.herokuapp.com/list', opt)
    .toPromise();
  }
  getTasks(idlist: number): any {
    const opt = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return new Promise((resolve, reject) => {
      this.http
        .get('https://apitrello.herokuapp.com/list/tasks/' + idlist, opt)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  }
  newList(name:string):any{
    const opt = { headers: {
      Authorization: `Bearer: ${this.jwt}` 
      }
    }
    const body = { name }
    return this.http.post('https://apitrello.herokuapp.com/list/',body ,opt)
    .toPromise();
  }
  newTask(text:string,idlist:number){
    const body = {  idlist , task: text }
    return this.http.post('https://apitrello.herokuapp.com/tasks',body).toPromise();
  }
  deleteTasks(idlist){
    const opt = { headers: {
      Authorization: `Bearer: ${this.jwt}` 
      }
    }
    return this.http.delete('https://apitrello.herokuapp.com/list/tasks/'+idlist,opt).toPromise();
  }
  deleteList(idlist){
    const opt = { headers: {
      Authorization: `Bearer: ${this.jwt}` 
      }
    }
    return this.http.delete('https://apitrello.herokuapp.com/list/'+idlist,opt).toPromise();

  }
  editNameList(name,idlist){
    const opt = { headers: {
      Authorization: `Bearer: ${this.jwt}` 
      }
    }
    const body = { name }
    return this.http.put('https://apitrello.herokuapp.com/list/'+idlist,body,opt).toPromise();
  }
  editTaskName(idlist,newTaskName){
    const opt = { headers: {
      Authorization: `Bearer: ${this.jwt}` 
      }
    }
    const body = {  idlist , task: newTaskName }
    return this.http.put('https://apitrello.herokuapp.com/list/tasks/'+idlist,body,opt).toPromise();
  }
  
}
