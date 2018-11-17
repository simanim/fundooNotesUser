import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
export interface DialogData {
  noteData:object
}
@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {

  @Input() card;
  constructor( public dialog: MatDialog ) { }

  ngOnInit() {
  }
  addCol(cardDetails): void {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '600px',
      data: { noteData : cardDetails }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
