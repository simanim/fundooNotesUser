import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {
public croppedImage;
  constructor(private NavbarServiceUser : UserService,public dialogRef : MatDialogRef<ImageCropComponent>, @Inject(MAT_DIALOG_DATA) public data : any ) { }
public apiImage;
  ngOnInit() {
  }
  imageCropped(event){
   this.croppedImage=event
  }
  uploadpic(){
    this.apiImage=this.croppedImage.file
    const uploadData = new FormData();
    uploadData.append('file', this.apiImage, this.apiImage.name);
    this.NavbarServiceUser.addProfileImage(uploadData)
    .subscribe(res => {
      this.dialogRef.close();
      localStorage.setItem("fundooUserImage",res['status'].imageUrl);
    }, error => {
    })
  }
}
