import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal([
    "Learn Angular",
    "Cooking",
    "Task 3",
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTasks = input.value;
    this.tasks.update((tasks) => [...tasks, newTasks]);
    input.value = "";
  }

}
