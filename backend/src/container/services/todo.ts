import { Todo } from '../models/todo';
import { ResourceNotFoundError } from '../../errors';

export interface CreateDTO {
  description: string;
  done: boolean;
  createdAt: Date;
}

export interface UpdateDTO {
  description?: string;
  done?: boolean;
  createdAt?: Date;
}

export class TodoService {
  async create(data: CreateDTO): Promise<Todo> {
    return await Todo.create(data);
  }

  async getAll(): Promise<Todo[]> {
    return await Todo.find();
  }

  async getById(id: string): Promise<Todo> {
    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      throw new ResourceNotFoundError();
    }

    return todo;
  }

  async updateById(id: string, data: UpdateDTO): Promise<Todo> {
    const todo = await Todo.findByIdAndUpdate(id, data, { new: true });

    if (!todo) {
      throw new Error('Resource not found');
    }

    return todo;
  }

  async delete(id: string): Promise<void> {
    const deleted = await Todo.deleteOne({ _id: id });
    console.log(deleted);
  }
}
