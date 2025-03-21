import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async delete(id: string) {
    await this.prisma.todo.delete({
      where: { id },
    });
    return { message: 'Todo deleted successfully' };
  }
}
