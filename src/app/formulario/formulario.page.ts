import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { TaskService, Task } from '../task.service';
import { CustomFormComponent } from '../custom-form/custom-form.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonLabel, IonItem, IonList, CustomFormComponent]
})
export class FormularioPage implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '' };
  editing: boolean = false;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.form = this.fb.group({
      task: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = [...this.taskService.getTasks()];
  }

  async onSubmit() {
    if (this.form.invalid) {
      return; // Evita agregar tareas vacías
    }

    this.newTask = { ...this.form.value.task };

    if (this.editing) {
      this.taskService.updateTask(this.newTask);
    } else {
      this.taskService.addTask({ ...this.newTask });
    }
    this.resetForm();
    this.loadTasks();
    this.tasks = [...this.tasks]; // Forzar actualización de la vista
  }

  editTask(task: Task) {
    this.newTask = { ...task };
    this.form.patchValue({ task });
    this.editing = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks();
    this.tasks = [...this.tasks]; // Forzar actualización de la vista
  }

  resetForm() {
    this.form.reset();
    this.newTask = { id: 0, title: '', description: '' };
    this.editing = false;
  }
}
