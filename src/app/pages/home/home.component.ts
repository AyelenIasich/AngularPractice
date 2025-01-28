import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    { id: crypto.randomUUID(), title: "Learn React", completed: true },
    { id: crypto.randomUUID(), title: "Learn Angular", completed: false },
    { id: crypto.randomUUID(), title: "Learn Vue", completed: false },
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
    input.value = "";
  }

  addTask(title: string) {
    const newTasks = { id: crypto.randomUUID(), title: title, completed: false };
    this.tasks.update((tasks) => [...tasks, newTasks]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

}
