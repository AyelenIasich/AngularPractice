import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    { id: crypto.randomUUID(), title: "Learn React", completed: true },
    { id: crypto.randomUUID(), title: "Learn Angular", completed: false },
    { id: crypto.randomUUID(), title: "Learn Vue", completed: false },
  ]);


  newTaskCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/\S+/)] });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value;
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string) {
    const newTasks = { id: crypto.randomUUID(), title: title, completed: false };
    this.tasks.update((tasks) => [...tasks, newTasks]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  updatedTask(index: number) {
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? { ...task, editing: true } : {...task, editing: false}));
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? { ...task, title:input.value, editing: false } : task));
  }
}
