import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private prisma: PrismaService) {}

  async create(createReminderDto: CreateReminderDto) {
    return this.prisma.reminder.create({
      data: createReminderDto,
    });
  }

  async findAll() {
    return this.prisma.reminder.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateReminderDto: UpdateReminderDto) {
    return this.prisma.reminder.update({
      where: { id },
      data: updateReminderDto,
    });
  }

  async delete(id: string) {
    await this.prisma.reminder.delete({
      where: { id },
    });
    return { message: 'Reminder deleted successfully' };
  }
}
