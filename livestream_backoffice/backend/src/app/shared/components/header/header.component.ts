import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService , public authentication : AuthenticationService) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }
  logout() {
    this.authentication.logout();
    location.reload()

}


  ngOnInit() {  }

}
