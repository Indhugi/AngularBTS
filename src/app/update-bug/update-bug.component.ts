import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';

@Component({
  selector: 'app-update-bug',
  templateUrl: './update-bug.component.html',
  styleUrls: ['./update-bug.component.css']
})
export class UpdateBugComponent implements OnInit {
  title: String = 'BugForm';
  bug: Bug = new Bug();
  constructor(private bugService: BugService) { }
  updateBug() {

    let bugId = (<HTMLInputElement>document.getElementById('bugId')).value
    const updatedBody = {
      title: (<HTMLInputElement>document.getElementById('title')).value,
      description: (<HTMLInputElement>document.getElementById('description')).value,
      priority: (<HTMLInputElement>document.getElementById('priority')).value,
      status: (<HTMLInputElement>document.getElementById('status')).value,
      type: (<HTMLInputElement>document.getElementById('type')).value,
      submitOnDate: (<HTMLInputElement>document.getElementById('submitOnDate')).valueAsDate,
      buildVersion: (<HTMLInputElement>document.getElementById('buildVersion')).value,
      projectId: (<HTMLInputElement>document.getElementById('projectId')).value,
      module: (<HTMLInputElement>document.getElementById('module')).value,
      product: (<HTMLInputElement>document.getElementById('product')).value,
      etaDate: (<HTMLInputElement>document.getElementById('etaDate')).value,

    }

    this.bugService.updateBug(bugId, updatedBody).subscribe(
      response => {
        console.log(response);
        alert("Bug updated....");
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
