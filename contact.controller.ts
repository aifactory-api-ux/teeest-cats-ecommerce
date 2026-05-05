import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessage, CreateContactDto } from '../shared/dtos/contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async submitContact(@Body() createContactDto: CreateContactDto): Promise<ContactMessage> {
    return this.contactService.submitContact(createContactDto);
  }
}