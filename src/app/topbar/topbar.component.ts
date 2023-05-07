import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  /*Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon*/
  myFunction() {
    var x = document.getElementById("myTopnav");
     if (x != null){
      if (x.className === "topbar-right") { // === is to compare the values
        x.className += " responsive";
        } else {
          x.className = "topbar-right";
        }
     }
  }
  isChecked = false;
}
