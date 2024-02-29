import { Component } from '@angular/core';
import { TaskFilterComponent } from "../task-filter/task-filter.component";
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
    imports: [TaskFilterComponent, CommonModule, FormsModule, RouterModule]
})
export class TaskListComponent {

    constructor(private taskService: TaskService) { }

    tasks: Array<Task> = [];

    newTask = new Task();

    ngOnInit() {
        this.tasks = this.taskService.getTasks();
    }

    addTask() {

        this.taskService.addTask(this.newTask);

        this.newTask = new Task();
    }

    removeTask(task: Task) {
        this.taskService.removeTask(task);
    }

    updateTasks() {
        this.taskService.updateTasks();
    }

    filterTasks(filter: string) {

        if (filter !== '') {
            this.tasks = this.tasks.filter(c => c.name.includes(filter))
        }
        else
        {
            this.tasks = this.taskService.getTasks();
        }
    }
}
