export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  message: string;
}