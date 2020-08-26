import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManchasPage } from './manchas.page';

describe('ManchasPage', () => {
  let component: ManchasPage;
  let fixture: ComponentFixture<ManchasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManchasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManchasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
