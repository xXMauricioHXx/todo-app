import { Router, Request, Response, NextFunction } from 'express';
import { TodoService } from '../../container/services/todo';

const todoService = new TodoService();

export class TodoController {
  register(router: Router) {
    router.post('/todo', this.create.bind(this));
    router.get('/todo', this.getAll.bind(this));
    router.get('/todo/:id', this.getById.bind(this));
    router.put('/todo/:id', this.update.bind(this));
    router.delete('/todo/:id', this.delete.bind(this));
  }

  protected async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getAll();
      res.send(todos);
    } catch (err) {
      return next(err);
    }
  }

  protected async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getById(req.params.id);
      res.send(todos);
    } catch (err) {
      return next(err);
    }
  }

  protected async create(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.create(req.body);
      res.send(todos);
    } catch (err) {
      return next(err);
    }
  }

  protected async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await todoService.delete(req.params.id);
      res.sendStatus(202);
    } catch (err) {
      return next(err);
    }
  }

  protected async update(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.updateById(req.params.id, req.body);
      res.send(todos);
    } catch (err) {
      return next(err);
    }
  }
}
