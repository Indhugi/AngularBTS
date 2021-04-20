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
  saveBug() {
    let createBug = (<HTMLInputElement>document.getElementById('createBug'))
    if (!createBug.checkValidity()) {
      alert('form is invalid');
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
