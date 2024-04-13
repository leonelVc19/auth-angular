import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authServer = inject( AuthService );
  public user = computed( () => this.authServer.currentUser() );

  onLogout( ) {
    this.authServer.logout();
    console.log('saliste perro');
  };

  get userData() {
    return this.authServer.currentUser()
  }
}
