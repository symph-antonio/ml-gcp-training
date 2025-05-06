import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  controllers: [RemindersController],
  providers: [RemindersService, PrismaService],
})
export class RemindersModule {}
