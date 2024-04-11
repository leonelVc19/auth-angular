import { Component, computed, inject, OnInit } from '@angular/core';
import { pipe, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  ngOnInit(): void {
    
  }
  private authServer = inject( AuthService );
  public user = computed( () => this.authServer.currentUser() );
}
