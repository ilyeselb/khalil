import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';
import { event } from 'src/app/shared/data/event';
import { abonnement } from 'src/app/shared/data/abonnement ';
import { AbonnementService } from 'src/app/shared/service/abonnement.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {


  public closeResult: string;
  public categories = []
  public abonnement: abonnement;
  public fileToUpload: FileList = null;
  public abonnements: abonnement[];
  public abonnements1: abonnement[];

  constructor(private modalService: NgbModal, public abonnementservice: AbonnementService ) {
    this.abonnement = new abonnement()
    this.abonnements = []
    this.abonnements1 = []
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
     
    
      reference: {
        title: 'reference'
      },
      title: {
        title: 'title'
      },

      type: {
        title: 'type'
      },
      price: {
        title: 'price',
      },
      periode: {
        title: 'period (days)',
      }
    },
    index: {
      title: 'sr_no',
      type: 'text',
      valuePrepareFunction: (value, row, cell) => {
        return cell.row.index;
      }
    },
    

  };
  //save event
  save() {
   
      this.abonnementservice.add(this.abonnement).subscribe(data => {
        console.log(data);
        location.reload()

      })
 

  }
  //getall abonnement
  getall() {
    this.abonnementservice.get().subscribe(data => {
      this.abonnements = data;
  
    })
  }
  //update events
  update() {
  

      this.abonnementservice.update(this.abonnement).subscribe(data => {
      })
      location.reload()

    

  }

  ngOnInit() {
    this.getall()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files;
  }
  openeditmodal(content, abonnement) {
    this.abonnement = abonnement.data
    console.log(this.abonnement);
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
  onDeleteConfirm(abonnement)
  {    
    this.abonnement = abonnement.data ;
    this.abonnementservice.delete(this.abonnement).subscribe(data => {})
    location.reload()
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
