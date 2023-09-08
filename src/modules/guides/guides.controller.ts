import { Controller, Get } from '@nestjs/common';
import { GuidesService } from './guides.service';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Get()
  async guides() {
    return this.guidesService.findAll();
  }
}
