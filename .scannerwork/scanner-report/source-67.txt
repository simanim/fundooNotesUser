/******************************************************************************
 *  Execution       :   1. default node         cmd> image-crop.component.ts 
 *
 *  Purpose         : To crop the selected image and setting as profile picture
 * 
 *  @file           : image-crop.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../core/services/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private NavbarServiceUser : UserService, private dialogRef : MatDialogRef<ImageCropComponent>, 
  @Inject(MAT_DIALOG_DATA) private data : any ) { }
  
  private apiImage;
  private croppedImage;

  ngOnInit() {
  }

  imageCropped(event){
   this.croppedImage=event
  }

 /**
  * 
  * @description uploading the image to profile
  */
  uploadpic(){
    this.apiImage=this.croppedImage.file
    const uploadData = new FormData();
    uploadData.append('file', this.apiImage, this.apiImage.name);
    this.NavbarServiceUser.addProfileImage(uploadData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.dialogRef.close();
      localStorage.setItem("fundooUserImage",res['status'].imageUrl);
    }, error => {
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
