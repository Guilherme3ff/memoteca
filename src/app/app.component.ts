import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container">
        <span class="navbar-brand">Memoteca Familiar</span>
        <a class="btn btn-outline-primary ms-auto" routerLink="/new">Nova Memória</a>
      </div>
    </nav>
    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: []
})
export class AppComponent {}