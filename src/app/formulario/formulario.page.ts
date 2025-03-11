import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { TaskService, Task } from '../task.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonItem, IonList]
})
export class FormularioPage implements OnInit {

  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '' };
  editing: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  saveTask() {
    if (this.editing) {
      this.taskService.updateTask(this.newTask);
    } else {
      this.taskService.addTask({ ...this.newTask });
    }
    this.resetForm();
    this.loadTasks();
  }

  editTask(task: Task) {
    this.newTask = { ...task };
    this.editing = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  resetForm() {
    this.newTask = { id: 0, title: '', description: '' };
    this.editing = false;
  }

}
