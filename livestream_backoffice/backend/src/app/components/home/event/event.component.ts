import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { event } from 'src/app/shared/data/event';
import { EventService } from 'src/app/shared/service/event.service';
import { environment } from 'src/environments/environment.prod';
import { DatePipe } from '@angular/common';
import { user } from 'src/app/shared/data/user';
import { UserService } from 'src/app/shared/service/user.service';
import { MessageService } from 'src/app/shared/service/message.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [
    DatePipe ]
})
export class EventComponent implements OnInit {

  public closeResult: string;
  public categories = []
  public event: event;
  public fileToUpload: FileList = null;
  public events: event[];
  public events2: event[];
  public Users : user[]
  public isChecked ;
  constructor(private modalService: NgbModal, public eventservice: EventService,public mailservice : MessageService , private Userservice : UserService,private datePipe: DatePipe) {
    this.event = new event()
    this.events = []
    this.events2 = []
    this.Users = []
  }


  //setting for ng2 smart table
  public settings = {
    mode: 'external',
    edit: {
      editButtonContent: 'string_or_html'
    },
    delete: {
      deleteButtonContent: 'string_or_html'
    },

    actions: {
      position: 'right'
    },
    columns: {
     
      image: {
        title: 'image',
        type: 'html',
        valuePrepareFunction: (value) => { return '<img style="width: 100%" src= ' + value + '  />' },


      },
      title: {
        title: 'Title'
      },
      date: {
        title: 'Date & Hour',

        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm');
          return formatted; 
        }
      },
      
      stat: {
        title: 'Status',
        type: 'html',
        filter : true ,
        filterFunction(cell?: any, search?: string): boolean {          
          if (cell === search || search === '') {
            return true;
          } else {
            return false;
          }          
        }
      },
      description: {
        title: 'Description',
      }

    },
    index: {
      title: 'sr_no',
      type: 'text',
      valuePrepareFunction: (value, row, cell) => {
        return cell.row.index;
      }
    },
    attr: {
      class: 'table table-bordered'
    }, //this
  
  };

 
  //save event
  save() {
    const formdata = new FormData();
    formdata.append("photos", this.fileToUpload[0]);
    this.eventservice.addimage(formdata).subscribe(data => {
      this.event.image = data.filename,
      this.event.stat = 'En attente'
      this.event.stream_id=''
      this.event.playback_id=''
      this.event.assests_id = ''
      this.eventservice.add(this.event).subscribe(data => {   
        let body = {
          users:  this.Users ,
          event : this.event,
          date : this.event.date.toDateString()
        }
        if(this.isChecked)
        {  try {
         
          this.mailservice.sendMessage(body).subscribe(data => {
        
          })
          location.reload()


        } catch (error) {
          
        }
          
          
          }
else
{
  location.reload()

}
      })
    })
  }
  getallusers() {
    this.events = []
    this.Userservice.getAll().subscribe(data => {
      this.Users = data;

    })
  }
  //getall events
  getall() {
    this.events = []
    this.eventservice.get().subscribe(data => {
      this.events = data;
      this.events.forEach(element => {
        element.image = environment.patheventimage + element.image
      });
      this.events.sort((a: event, b: event) => {
        return  new Date( b.date).getTime() - new Date( a.date).getTime();
    });
    })
  }
 
  //update events
  update() {
    //get image filename only
    this.event.image = this.event.image.split("/", 5)[4]
    //condition if image is updated
    if (this.fileToUpload) {
      const formdata = new FormData();
      formdata.append("photos", this.fileToUpload[0]);
      this.eventservice.deletefile(this.event).subscribe(data => {})
      this.eventservice.addimage(formdata).subscribe(data => {
        this.event.image = data.filename,        
        this.eventservice.update(this.event).subscribe(data => {
        })
        location.reload()

      })
    }
    else {
      this.eventservice.update(this.event).subscribe(data => {
      })
      location.reload()

    }

  }

  ngOnInit() {    
    this.getall();
    this.getallusers();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files;
  }
  openeditmodal(content, event) {
    this.event = event.data
    this.modalService.open(content, { windowClass: 'modal_custom', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'modal_custom', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onDeleteConfirm(event)
  {    
    this.event = event.data 
    
    this.event.image = this.event.image.split("/", 5)[4];

    this.eventservice.delete(this.event).subscribe(data => {
      location.reload()
    })
    // this.eventservice.deletefile(this.event).subscribe(data => {
    //   location.reload()

    // })


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
