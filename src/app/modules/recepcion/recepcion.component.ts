import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserI } from '@shared/models/user-i.model';
import { config } from 'app/config/app-setting.conf';
import { ReceptionService } from '@services/login/reception.service';
import { StorageService } from '@services/login/storage.service';
import { ReceptionCardI } from '@shared/models/reception-card-i.model';
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss'],

})
export class RecepcionComponent implements OnInit {
  public backgroundImage : string = config.receptionImage; 
  public logo :string = '';
  // cardsImage: string[][] = config.imagesCard;
  public cardsImage!: ReceptionCardI[];
  public userSession: UserI | undefined;
  public sizeCard: number = 100; //Size card image 100%
  public getMyStyle = {};
  public hAlignment:string = 'center center';
  constructor(private storageService: StorageService,
    private receptionService: ReceptionService) { 
      // Getting the image from the storage service.
      this.receptionService.getAllAppsByRol().subscribe({
        next: (data:any)=> {
          console.log(data);
          this.cardsImage=data;  
          // Calculate the size card
          this.getSizeCard();         
        },
        error: (err:any) => { console.log(err)}
      });
    }

  ngOnInit(): void {
    this.logo = config.logoCasitaRoja;
    console.log(this.logo);
    
    this.userSession = this.storageService.getCurrentUser();
  }

  private getSizeCard():void{
    let size = this.cardsImage.length;
    console.log(size);
    this.sizeCard=50;
    switch (size) {
      case 0: {
        this.sizeCard=100;
        this.hAlignment = 'center center';
        break;
      }
      case 1: {
        this.sizeCard=50;
        this.hAlignment = 'space-around center';
        break;
      }
      case 2: {
        this.sizeCard=40;
        this.hAlignment = 'space-around center';
        break;
      }
      case 3: {
        this.sizeCard=30;
        this.hAlignment = 'space-around center';
        break;
      }
      case 4: {
        this.sizeCard=35;
        this.hAlignment = 'center center';
        this.getMyStyle = {
          padding: '10px 0',
          maxWidth: '70%'
        }
        break;
      }
      case 5: {
        this.sizeCard=32;
        this.hAlignment = 'center center';
        this.getMyStyle = {
          padding: '20px 0',
          maxWidth: '65%'
        }
        break;
      }
      case 6: {
        this.sizeCard=32;
        this.hAlignment = 'center center';
        this.getMyStyle = {
          padding: '20px 0',
          maxWidth: '65%'
        }
        break;
      }
      default: {
          this.sizeCard=33;
      }

  }
  }
}
