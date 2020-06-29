import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { user } from 'src/app/shared/data/user';
import { abonnement } from 'src/app/shared/data/abonnement ';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe]

})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public user : user
  public abonnement : abonnement ;
  public users = [] ;
  constructor(private formBuilder: FormBuilder , public authentication : AuthenticationService , private datePipe: DatePipe,public Userservice : UserService) {
    this.createRegisterForm();
    this.user = new user()
    this.abonnement = new abonnement()
    


  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }
  ngOnInit() {
    this.getallusers()
  }
  getallusers() {
    this.Userservice.getAll().subscribe(data => {
      this.users = data;
    })
  }
  onSubmit() {
    var today = new Date();
    let datfin: Date = new Date("2100-01-16");  
    this.user.role = 'admin'
    this.abonnement.date_debut = today
    this.abonnement.date_fin = datfin
    this.abonnement.token = ""
    this.user.lname="admin"
    this.user.fname="admin"
    this.user.abonnement= this.abonnement
    this.authentication.registre(this.user).subscribe(data => {
      location.reload();
    })
  }
  public settings = {
    mode: 'external',
   
    delete: {
      deleteButtonContent: 'string_or_html'
    },

    actions: {
      position: 'right'
    },
    columns: {
     
      email: {
        title: 'Email'
      }, fname: {
        title: 'First name'
      },
      lname: {
        title: 'Last name'
      },
     
     
      role: {
        title: 'Role',
      }

    },
  
    attr: {
      class: 'table table-bordered'
    }, //this
  
  };
  onDeleteConfirm(u)
  {    
    this.user = u.data 
    

    this.Userservice.delete(this.user).subscribe(data => {
      location.reload()
    })
  }
 
}
