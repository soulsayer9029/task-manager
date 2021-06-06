import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService:WebRequestService) { }
  
  createTaskList(title:string){
    //create task list
    return this.webRequestService.post('api/v1/tasklists/createTaskList',{title})
  }
  getLists(){
    return this.webRequestService.get('api/v1/tasklists/')
  }
  getTasks(listId:string){
    return this.webRequestService.get(`api/v1/tasks/getTasks/${listId}`)
  }
  createTask(task:string,listId:string){
    return this.webRequestService.post(`api/v1/tasks/createTask/${listId}`,{task})
  }
  complete(task:any){
    return this.webRequestService.patch(`api/v1/tasks/updateTask/${task._id}`,{
      completed:!task.completed
    })
  }
  deleteList(listId:any){
    return this.webRequestService.delete(`api/v1/tasklists/deleteTaskList/${listId}`)
  }
  updateList(listId:string,listName:string){
    return this.webRequestService.patch(`api/v1/tasklists/updateTaskList/${listId}`,{
      title:listName
    })
  }
  deleteTask(taskId:any){
    return this.webRequestService.delete(`api/v1/tasks/deleteTask/${taskId}`)
  }
  updateTask(taskId:any,taskTitle:string){
    return this.webRequestService.patch(`api/v1/tasks/updateTask/${taskId}`,{
      task:taskTitle
    })
  }
}
