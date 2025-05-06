import { ApiProperty } from '@nestjs/swagger';

export class CreateReminderDto {
  @ApiProperty({
    description: 'The title of the reminder',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the reminder',
    example: 'Milk, eggs, bread',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The due date of the reminder',
    example: '2023-12-31T23:59:59Z',
    required: false,
  })
  dueDate?: Date;
}
