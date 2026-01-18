import { Component, signal } from '@angular/core';
import { AuthentificationService} from './shared/services/authservice'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SpletnaTrgovina');

  constructor(private authService: AuthentificationService){}

  public isUserLoggedIn() : boolean {
    return this.authService.isLoggedIn()
  }
}
