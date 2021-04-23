import { Component, OnInit } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';


@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent implements OnInit {
  title: String = 'BugForm';
  bug: Bug = new Bug();


  constructor(private bugService: BugService) { }
  validateFields(){
    if (!this.bug.title.trim()) {
      alert("Please provide Bug Name");
    }
    else if (this.bug.title.length > 200) {
      alert("Bug Name cannot be more than 200 character");
    }
    else if (!this.bug.projectId.trim()) {
      alert("Please provide Project id");
    }
    else if (this.bug.projectId.length > 10) {
      alert("Project id cannot be more than 10 characters");
    }
    else if (!this.bug.product.trim()) {
      alert("Please provide Product Name");
    }
    else if (this.bug.product.length > 50) {
      alert("Product Name cannot be more than 50 characters");
    }
    else if (!this.bug.module.trim()) {
      alert("Please provide Module Name");
    }
    else if (this.bug.module.length > 50) {
      alert("Module Name cannot be more than 50 characters");
    }
    else if (!this.bug.buildVersion.trim()) {
      alert("Please provide Build Version");
    }
    else if (this.bug.buildVersion.length > 15) {
      alert("Build Version cannot be more than 15 character");
    }
    else if (!this.bug.description.trim()) {
      alert("Please provide description");
    }
    else if (this.bug.description.length > 1000) {
      alert("Please provide description");
    }
  }
  saveBug() {
    this.validateFields();
    let createBug = (<HTMLInputElement>document.getElementById('createBug'))
    if (!createBug.checkValidity()) {
      alert('Form is Invalid!');
      return;
    }
    const promise = this.bugService.saveBug(this.bug);
    promise.subscribe(response => {
      console.log(response);
      alert("Bug saved...");
    },
      error => {
        console.log(error);
        alert(error.statusText);

      }
    )


  }
  ngOnInit(): void {

  }

}
