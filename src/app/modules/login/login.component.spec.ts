import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
//Arrange
             //  => initializes objects and sets the value of the data
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    
    //Act
             //   => invokes the method under test with the arranged parameters
    //Assert
    expect(component).toBeTruthy();
  });

  it('should be "primary | sencondary" type', ()=>{
    //Arrange
    let color = component.colorTitle;
    //Act
    let type_color = ''
    //Acert
    expect(type_color).toBeNull();
  })
});
