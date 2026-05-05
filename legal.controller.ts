import { Controller, Get, Param } from '@nestjs/common';
import { LegalService } from './legal.service';
import { LegalPage } from '../shared/dtos/legal.dto';

@Controller('api/legal')
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @Get(':slug')
  async getLegalPage(@Param('slug') slug: string): Promise<LegalPage> {
    return this.legalService.getLegalPage(slug);
  }
}