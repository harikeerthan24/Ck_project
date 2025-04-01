/**
 * @author Rakul CK
 * @file welcome.component.ts
 * @description Welcome page component that serves as the landing page of the application.
 * Provides navigation options to access the survey form and view survey responses.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  title = 'Student Survey Application';
}
