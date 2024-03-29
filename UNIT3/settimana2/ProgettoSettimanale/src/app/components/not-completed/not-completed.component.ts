import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todos } from 'src/app/models/todos.interface';
import { TodoService } from 'src/app/service/todo.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-not-completed',
  templateUrl: './not-completed.component.html',
  styleUrls: ['./not-completed.component.scss']
})
export class NotCompletedComponent implements OnInit, OnDestroy {
  todos: Todos[] = [];
  subscription!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscription = this.todoService.getTodos().subscribe(
      (data: Todos[]) => {
        this.todos = data.filter(todo => !todo.completed);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
