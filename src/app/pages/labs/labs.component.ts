import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = [
    { id: 1, name: 'Aprender Angular' },
    { id: 2, name: 'Aprender Angular CLI' },
    { id: 3, name: 'Crear Proyecto' },]

  get taskNames(): string {
    return this.tasks.map(task => task.name).join(', ');
  }

  name = signal('Aye');

  isBtnDisabled = false;
  selfiePhoto = "https://github.com/AyelenIasich.png"

  person = {
    name: "aye",
    age: 32,
    email: "iasichayelen.com",
    avatar: "https://github.com/AyelenIasich.png"
  }

  clickHandler() {
    alert("hellloooooo")
  }

  changeHandler(event: Event){
    console.log(event)
  }
  
  valueChange = "";

  changeHandlerText(event: Event){
    const elementInput = event.target as HTMLInputElement;
    this.valueChange = elementInput.value;
  }

  valueInput = "";

  changeHandlerTextInput(event: Event){
    const elementInput = event.target as HTMLInputElement;
    this.valueInput = elementInput.value;
  }

  keyPress = ""
  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    this.keyPress = input.value;
    console.log(input.value)
  }

  changeNameHandler(event: KeyboardEvent){
    const valueInput = event.target as HTMLInputElement;
    const newValue = valueInput.value;
    this.name.set(newValue) 
  }
}
