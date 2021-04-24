import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'torrent-front';
  inSystem = false
  ngOnInit() {
    let user = localStorage.getItem('token')
    if(user) {
      this.inSystem = true
    }
  }

  logOut() {
    localStorage.clear()
    this.inSystem = false
  }
}
