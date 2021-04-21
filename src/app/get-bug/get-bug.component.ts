import { Component, OnInit } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';
import { STATUS } from '../STATUS';

@Component({
  selector: 'app-get-bug',
  templateUrl: './get-bug.component.html',
  styleUrls: ['./get-bug.component.css']
})
export class GetBugComponent implements OnInit {
  bug: Bug = new Bug();
  constructor(private bugService: BugService) { }
  bugList: any;
  searchElement: any;
  responseList: Boolean;
disablestatus(){
  (<HTMLInputElement>document.getElementById('bugStatus')).disabled=true;
}
disabletitle(){
  (<HTMLInputElement>document.getElementById('bugTitle')).disabled=true;
}
  getBug() {
    let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
    let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
    let endpointURL = 'http://localhost:8080/bug/';

    if (Object.values(STATUS).includes(bugStatus)) {

      endpointURL = endpointURL + 'status/' + bugStatus;
      this.bugService.getBug(endpointURL).subscribe(response => {
        this.bugList = response;
        if(response!=null){
          console.log(response);
          alert('Bug Listed!!');
        }
        else{
          alert("Bug with "+ bugStatus +" not found");
        }
      },
        error => {
          console.log(error);
          alert("Error Happened!!");

        }
      )
    }
    else {
      endpointURL = endpointURL + 'title/' + bugTitle;
      this.bugService.getBug(endpointURL).subscribe(response => {
        this.bugList = [response];
        if(response!=null){
          console.log(response);
          alert('Bug Listed!');
        }
        else{
          alert("Bug with "+ bugTitle +" not found");
        }

      },
        error => {
          console.log(error);
          alert("Error Happened!!");

        }
      )
    }



  }
  // getBugs() {

  // }

  ngOnInit(): void {
    this.bugService.getBugs().subscribe(response => {
      this.bugList = response;
      console.log(response);

    },
      error => {
        console.log(error);
        alert(error.statusText);

      }
    )
  }

}
