import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists:any;
  tasks:any;
  selectedListId:any;
  constructor(private taskService:TaskService  ,private router:Router,private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        if(params.listId){
          this.selectedListId=params.listId
          this.taskService.getTasks(params.listId).subscribe((res:any)=>{
            
            this.tasks=res.data
          })
        }else{
          this.tasks=undefined
        }
        
       
      }
      
    )
    this.taskService.getLists().subscribe((res:any)=>{
        this.lists=res.data
        
    })
  }
  onTaskClick(task:any){
    this.taskService.complete(task).subscribe((res:any)=>{
      
      task.completed=!task.completed
    })
  }
  deleteList(){
    this.taskService.deleteList(this.selectedListId).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/lists'])
    })
  }
  deleteTask(task:any){
    this.taskService.deleteTask(task._id).subscribe((res:any)=>{
      this.tasks=this.tasks.filter(
         (val:any)=>{
          return val._id!=task._id}
        )
      //this.router.navigate(['/lists'])
    })
  }
}
