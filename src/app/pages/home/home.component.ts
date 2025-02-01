import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskFilterEnum } from '../../enums/task-filter.enum';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  newTaskCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/\S+/)] });

  filter = signal<TaskFilterEnum>(TaskFilterEnum.ALL);

  taskFilterEnum = TaskFilterEnum;

  injector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = (JSON.parse(storage));
      this.tasks.set(tasks);
    }
    this.tractTask();
  }

  tractTask(){
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  });

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
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? { ...task, editing: true } : { ...task, editing: false }));
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? { ...task, title: input.value, editing: false } : task));
  }

  changeFilter(filter: TaskFilterEnum) {
    this.filter.set(filter);
  }
}
