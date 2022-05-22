import { Component, OnInit } from '@angular/core';
import { config } from 'app/config/app-setting.conf';
@Component({
  selector: 'dav-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public logo :string = '';
  colorTitle :'primary' | 'secondary' ='primary'
  constructor() { }

  public setMyStyles(){
    let styles = {
      backgroundImage: config.bgImage  
    }
    return styles;
  }

  ngOnInit(): void {
    this.logo = config.logoImage;
  }
}
