import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { GuidesService } from './services/guides.service';
import { ApiKeyGuard } from './api-key.guard';
import { ListGuidesService } from './services/list-guides.service';

@Controller('guides')
@UseGuards(ApiKeyGuard)
export class GuidesController {
  constructor(
    private readonly guidesService: GuidesService,
    private readonly listGuidesService: ListGuidesService,
  ) {}

  @Get()
  async listGuides() {
    return this.listGuidesService.listAll();
  }

  @Post()
  async create() {
    return this.guidesService.create();
  }
}
