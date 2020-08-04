import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuartaPage } from './cuarta.page';

describe('CuartaPage', () => {
  let component: CuartaPage;
  let fixture: ComponentFixture<CuartaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuartaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
