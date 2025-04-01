/**
 * @author Rakul CK , Bhavya
 * @fileoverview Unit tests for StudentSurveyComponent.
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSurveyComponent } from './student-survey.component';

describe('StudentSurveyComponent', () => {
  let component: StudentSurveyComponent;
  let fixture: ComponentFixture<StudentSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
