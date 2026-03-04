import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; 
import { App } from './app';

describe('App', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [  
        provideRouter([])
      ]
    }).compileComponents();
  });


  /*** Test #1 ***/
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  /*** Test #2 ***/
  it('should render navbar brand title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const brand = compiled.querySelector('.navbar-brand');

    expect(brand?.textContent)
      .toContain('WebApiWithAngular-UI');
  });


});
