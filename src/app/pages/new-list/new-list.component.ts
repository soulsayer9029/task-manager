import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit(): void {
  }

  createNewList(title:string){
    this.taskService.createTaskList(title).subscribe((res:any)=>{
      //console.log(res)
      this.router.navigate(['/lists',res._id])
    })
    //now we route back to main page and send id along with the route
   // console.log(title)
   
  }
  

}
