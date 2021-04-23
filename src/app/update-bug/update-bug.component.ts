import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';

@Component({
  selector: 'app-update-bug',
  templateUrl: './update-bug.component.html',
  styleUrls: ['./update-bug.component.css']
})
export class UpdateBugComponent implements OnInit {
  //title: String = 'BugForm';
  bug: Bug = new Bug();
  bugList:any;
  bugArray: Bug[] = [];
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
  getBugName() {
    let endpointURL = 'http://localhost:8080/bug/';
    let bugTitle=(<HTMLInputElement>document.getElementById('title')).value;
    if (bugTitle) {
      endpointURL = endpointURL + bugTitle;
      const promise = this.bugService.getBugByName(bugTitle);
      promise.subscribe(response => {
        this.bugList = response;
        this.bugArray=this.bugList;
        console.log(this.bugArray);
        if(this.bugArray.length>0){
            this.bug=this.bugArray[0];
            let resEtaDate = this.bug.etaDate;
            let resSubmitDate=this.bugList.submitOn;
            if (resSubmitDate) {
              let finalSubmitDate = resSubmitDate.split('T')[0];
              this.bug.submitOnDate = finalSubmitDate;
            }
             if (resEtaDate) {
                let finalEtaDate = resEtaDate.split('T')[0];
                this.bug.etaDate = finalEtaDate;
              }
      }
        else{
          alert("Given Bug with title "+bugTitle+" is not available");
        }
      },
      error => {
        console.log(error);
        alert("Error Happened!");
    }
    )
  }
  else{
    alert("Specify title to fetch bug details");

  }
}
  updateBug() {
    this.validateFields();
    let updateBug = (<HTMLInputElement>document.getElementById('updateBug'))
    if (!updateBug.checkValidity()) {
      alert('Form is Invalid!');
      return;
    }
    let bugId = (<HTMLInputElement>document.getElementById('bugId')).value
    const updatedBody = {
      bugId:(<HTMLInputElement>document.getElementById('bugId')).value,
      title: (<HTMLInputElement>document.getElementById('title')).value,
      description: (<HTMLInputElement>document.getElementById('description')).value,
      priority: (<HTMLInputElement>document.getElementById('priority')).value,
      status: (<HTMLInputElement>document.getElementById('status')).value,
      type: (<HTMLInputElement>document.getElementById('type')).value,
      submitOnDate: (<HTMLInputElement>document.getElementById('submitOnDate')).value,
      buildVersion: (<HTMLInputElement>document.getElementById('buildVersion')).value,
      projectId: (<HTMLInputElement>document.getElementById('projectId')).value,
      module: (<HTMLInputElement>document.getElementById('module')).value,
      product: (<HTMLInputElement>document.getElementById('product')).value,
      etaDate: (<HTMLInputElement>document.getElementById('etaDate')).value,
    }

    this.bugService.updateBug(bugId, updatedBody).subscribe(
      response => {
        console.log(response);
        alert("Bug updated!");
      },
      error => {
        console.log(error);
        alert("Error Happened!");

      }
    )


  }

  ngOnInit(): void {
  }

}
