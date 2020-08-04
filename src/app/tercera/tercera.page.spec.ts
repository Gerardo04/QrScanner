import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TerceraPage } from './tercera.page';

describe('TerceraPage', () => {
  let component: TerceraPage;
  let fixture: ComponentFixture<TerceraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerceraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TerceraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
