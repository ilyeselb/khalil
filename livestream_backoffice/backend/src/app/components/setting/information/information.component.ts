import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { mediaDB } from 'src/app/shared/tables/media';
import { InformationsService } from 'src/app/shared/service/informations.service';
import { informations } from 'src/app/shared/data/informations';
import { logo } from 'src/app/shared/data/logo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public media = []
  public fileToUpload: FileList = null;
  public fileToUploadlogo: FileList = null;
  public information
  public informationdisplay
  public informations = []
  public logos = []
  public logo 
  public logodisplyy
  constructor(public inforservice: InformationsService) {
    this.information = new informations()
    this.informationdisplay = new informations()
    this.logo = new logo()
    this.logodisplyy = new logo()

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files;
  }
  handleFileInputlogo(files: FileList) {
    this.fileToUploadlogo = files;
  }
  ngOnInit(): void {
    this.get()
    this. getlogo()
  }
  onSubmitlogo() {
    if(this.logodisplyy.logo)
    
  {    
    

    this.logodisplyy.logo =   this.logodisplyy.logo.split("/", 5)[4]
    this.inforservice.deletelogo(this.logodisplyy).subscribe(data => {
    const formdata = new FormData();
    formdata.append("photos", this.fileToUploadlogo[0]);
    this.inforservice.addimagelogo(formdata).subscribe(data => {
      location.reload()
    })
    })}
    else{
      const formdata = new FormData();
      formdata.append("photos", this.fileToUploadlogo[0]);
      this.inforservice.addimagelogo(formdata).subscribe(data => {
        location.reload()
      })
    }
   
  }
  onSubmit() {
    if(this.informationdisplay)
    {
      this.informationdisplay.image_aboutus =   this.informationdisplay.image_aboutus.split("/", 5)[4]

      this.inforservice.delete(this.informationdisplay).subscribe(data => {
      const formdata = new FormData();
      formdata.append("photos", this.fileToUpload[0]);
      this.inforservice.addimage(formdata).subscribe(data => {
        this.information.image_aboutus = data.filename,
          this.inforservice.add(this.information).subscribe(data => {
            location.reload()
          })
      })
    })}
    else{
      const formdata = new FormData();
      formdata.append("photos", this.fileToUpload[0]);
      this.inforservice.addimage(formdata).subscribe(data => {
        this.information.image_aboutus = data.filename,
          this.inforservice.add(this.information).subscribe(data => {
            location.reload()
          })
      })

    }
   

  }
  get() {
    this.inforservice.get().subscribe(data => {
      console.log(data);

      data.forEach(element => {
        element.image_aboutus = environment.pathhome + element.image_aboutus
        this.informationdisplay = element

      });
    })
   
  }
  getlogo() {
    this.inforservice.getlogo().subscribe(data => {

      data.forEach(element => {
        element.logo = environment.logo + element.logo
        this.logodisplyy = element
      });
    })
}
}