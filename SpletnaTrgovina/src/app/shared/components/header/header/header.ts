import { Component } from '@angular/core';
import { AuthentificationService } from '../../../services/authservice';
import { Router } from '@angular/router'


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  constructor(private authService: AuthentificationService, private router: Router) {
}

  public logMeOut() {

    console.log("Kliče")
    //this.authService.logout()
    //this.router.navigate(["/login"])
  }

}


