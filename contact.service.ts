import { Injectable } from '@nestjs/common';
import { ContactMessage, CreateContactDto } from '../shared/dtos/contact.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactService {
  private messages: Map<string, ContactMessage> = new Map();

  async submitContact(createContactDto: CreateContactDto): Promise<ContactMessage> {
    const now = new Date().toISOString();

    const message: ContactMessage = {
      id: uuidv4(),
      name: createContactDto.name,
      email: createContactDto.email,
      message: createContactDto.message,
      createdAt: now,
    };

    this.messages.set(message.id, message);
    return message;
  }
}