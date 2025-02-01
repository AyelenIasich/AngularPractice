import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskSimple } from '../../models/task.model';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})

export class LabsComponent {

  tasks: TaskSimple[] = [
    { id: 1, name: 'Aprender Angular' },
    { id: 2, name: 'Aprender Angular CLI' },
    { id: 3, name: 'Crear Proyecto' },]

  get taskNames(): string {
    return this.tasks.map(task => task.name).join(', ');
  }

  nameList = signal(
    [
      'Aye',
      'Matias',
      'Gabo',

    ])

  name = signal('Aye');

  isBtnDisabled = false;
  selfiePhoto = "https://github.com/AyelenIasich.png"

  person = signal({
    name: "aye",
    age: 32,
    email: "iasichayelen.com",
    avatar: "https://github.com/AyelenIasich.png"
  })

  clickHandler() {
    alert("hellloooooo")
  }

  changeHandler(event: Event) {
    console.log(event)
  }

  changeHandlerAge(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    this.valueChange = elementInput.value;
    this.person.update((person) => ({ ...person, age: parseInt(elementInput.value) }))
  }

  valueChange = "";

  changeHandlerText(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    this.valueChange = elementInput.value;
  }

  valueInput = "";

  changeHandlerTextInput(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    this.valueInput = elementInput.value;
  }

  keyPress = ""
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.keyPress = input.value;
    console.log(input.value)
  }

  changeNameHandler(event: KeyboardEvent) {
    const valueInput = event.target as HTMLInputElement;
    const newValue = valueInput.value;
    this.name.set(newValue)
  }

  changeHandlerName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.person.update((person) => ({ ...person, name: input.value }))
  }

  colorCtrl = new FormControl();

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }

  widthControl = new FormControl(50, { nonNullable: true });

  nameControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
}
