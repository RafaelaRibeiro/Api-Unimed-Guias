import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { GuidesService } from './services/guides.service';
import { ApiKeyGuard } from './api-key.guard';
import { ListGuidesService } from './services/list-guides.service';
import { createGuidesDTO } from './guides.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('guias')
@ApiBearerAuth()
@ApiHeader({
  name: 'api-key',
  description: 'Chave de API para autenticação',
})
@Controller('guides')
@UseGuards(ApiKeyGuard)
export class GuidesController {
  constructor(
    private readonly guidesService: GuidesService,
    private readonly listGuidesService: ListGuidesService,
  ) {}

  @ApiOperation({ summary: 'Lista todas as guias que devem ser executadas' })
  @Get()
  async listGuides() {
    return this.listGuidesService.listAll();
  }

  @ApiOperation({ summary: 'Armazena guias executadas' })
  @ApiBody({ type: [createGuidesDTO] })
  @Post()
  async create(@Body() guides: createGuidesDTO[]) {
    return this.guidesService.create(guides);
  }
}
