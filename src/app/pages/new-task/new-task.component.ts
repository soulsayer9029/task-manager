import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router) { }
  listId:any
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.listId=params.listId
        
        })
      }
      
  createNewTask(task:string){
    this.taskService.createTask(task,this.listId).subscribe((res:any)=>{
      this.router.navigate(['/lists',res.data.list])
    })
  }
  }
  

