import { ApiProperty } from '@nestjs/swagger';

export class UpdateReminderDto {
  @ApiProperty({
    description: 'The title of the reminder',
    example: 'Buy groceries',
    required: false,
  })
  title?: string;

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

  @ApiProperty({
    description: 'Whether the reminder is completed',
    example: true,
    required: false,
  })
  completed?: boolean;
}
