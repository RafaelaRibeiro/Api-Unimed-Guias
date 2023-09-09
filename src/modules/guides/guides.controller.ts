import { Controller, Get, UseGuards } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { ApiKeyGuard } from './api-key.guard';

@Controller('guides')
@UseGuards(ApiKeyGuard)
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Get()
  async guides() {
    return this.guidesService.findAll();
  }
}
