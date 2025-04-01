/**
 * @author Rakul CK , Bhavya
 * @file app.component.ts
 * @description Main application component that serves as the root component of the Angular application.
 * Handles the overall layout and navigation structure of the application.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Student Survey Application';
}
