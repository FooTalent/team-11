import { createAction, props } from '@ngrx/store';
import { Task } from '../tasks/tasks.model'
export const addTask = createAction("[Task Component] Add task",
props<{ task: Task }>());