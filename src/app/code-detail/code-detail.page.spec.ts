import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeDetailPage } from './code-detail.page';

describe('CodeDetailPage', () => {
  let component: CodeDetailPage;
  let fixture: ComponentFixture<CodeDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
