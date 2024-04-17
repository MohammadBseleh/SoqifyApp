import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindSupplierPage } from './find-supplier.page';

describe('FindSupplierPage', () => {
  let component: FindSupplierPage;
  let fixture: ComponentFixture<FindSupplierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
