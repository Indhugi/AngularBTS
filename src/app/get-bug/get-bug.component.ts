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
  bugArray: Bug[] = [];

  showDescription(description: string) {
    document.getElementById('showDescription').innerHTML = description;
    return document.getElementById('temp').click();
  }
  deleteBug(bugId){
    let ask=confirm("Do you want to delete bug this bug ?");
    if (!ask){
      return;
    }
    this.bugService.deleteBug(bugId).subscribe(response => {
      this.bugList = response;
      console.log(response);
      alert("Bug Deleted!")
      this.getBugs();
    },
      error => {
        console.log(error);
        alert("Error Happened!");
      }
    )
  }

  //old implementation
  // getBug() {
  //   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
  //   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
  //   let endpointURL = 'http://localhost:8080/bug/';

  //   if (Object.values(STATUS).includes(bugStatus)) {

  //     endpointURL = endpointURL + 'status/' + bugStatus;
  //     this.bugService.getBugByStatus(bugStatus).subscribe(response => {
  //       this.bugList = response;
  //       if(response!=null){
  //         console.log(response);
  //         alert('Bug Listed!!');
  //       }
  //       else{
  //         alert("Bug with "+ bugStatus +" not found");
  //       }
  //     },
  //       error => {
  //         console.log(error);
  //         alert("Error Happened!!");

  //       }
  //     )
  //   }
  //   else {
  //     endpointURL = endpointURL + 'title/' + bugTitle;
  //     this.bugService.getBugByName(bugTitle).subscribe(response => {
  //       this.bugList = response;
  //       if(response!=null){
  //         console.log(response);
  //         alert('Bug Listed!');
  //       }
  //       else{
  //         alert("Bug with "+ bugTitle +" not found");
  //       }

  //     },
  //       error => {
  //         console.log(error);
  //         alert("Error Happened!!");

  //       }
  //     )
  //   }
  // }


  //new search implementation
  getBug() {
    let status = (<HTMLInputElement>document.getElementById('bugStatus')).value;
    let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
    if (bugTitle && !status) {
      if (bugTitle.trim()) {
        const promise = this.bugService.getBugByName(bugTitle);
        promise.subscribe(response => {
          this.bugList = response;
          this.bugArray=this.bugList;
          if (this.bugArray.length>0) {
            console.log(response);
            alert("Bug Listed!");
          }
          else {
            alert("Record not found");
            this.getBugs();
          }
        },
          error => {
            alert('Error Happened..')
          });
      }
      else {
        alert("please provide bug title");
        this.bugArray = [];
      }
    }
    else if (status && !bugTitle) {
      const promise = this.bugService.getBugByStatus(status);
      promise.subscribe(response => {
        this.bugList = response;
        this.bugArray=this.bugList;
        if (this.bugArray.length>0) {
          //this.bugArray = this.bugList;
          alert("Bug Listed!")
        }
        else {
          alert("No Bug with Status : " + status + " found");
          this.bugArray = [];
        }
      },
        error => {
          alert('Error Happened..')
        })
    }
    else if (bugTitle && status) {
      const promise = this.bugService.getBugByNameAndStatus(bugTitle, status);
      promise.subscribe(response => {
        this.bugList = response;
        this.bugArray=this.bugList;
        if (this.bugArray.length>0) {
          this.bugArray = this.bugList;
          alert("Bug Listed!");
        }
        else {
          alert("No Bug with Name : " + bugTitle + " and Status : " + status + " found");
          this.bugArray = [];
        }
      },
        error => {
          alert('Error Happened..')
        })
    }
    else {
      const observable = this.bugService.getBugs();
      observable.subscribe(response => {
        this.bugList = response;
        if (this.bugList) {
          this.bugArray = this.bugList;
        }

      }, error => alert("Error occurred"));
    }
  }
   getBugs() {
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

  ngOnInit(): void {
    this.getBugs();
  }

}
