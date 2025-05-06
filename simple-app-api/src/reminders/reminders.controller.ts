import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { RemindersService } from './reminders.service';

@ApiTags('reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @ApiOperation({ summary: 'Create a new reminder' })
  @ApiResponse({
    status: 201,
    description: 'The reminder has been successfully created.',
  })
  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @ApiOperation({ summary: 'Get all reminders' })
  @ApiResponse({
    status: 200,
    description: 'Returns all reminders',
  })
  @Get()
  findAll() {
    return this.remindersService.findAll();
  }

  @ApiOperation({ summary: 'Update a reminder' })
  @ApiParam({ name: 'id', description: 'Reminder ID' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been successfully updated.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, updateReminderDto);
  }

  @ApiOperation({ summary: 'Delete a reminder' })
  @ApiParam({ name: 'id', description: 'Reminder ID' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been successfully deleted.',
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.remindersService.delete(id);
  }
}
