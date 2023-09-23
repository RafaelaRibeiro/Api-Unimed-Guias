import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { guidesDTO } from '../guides.dto';
import { ListGuidesService } from './list-guides.service';

@Injectable()
export class GuidesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly listGuidesService: ListGuidesService,
  ) {}

  async create() {
    const guides: guidesDTO[] = await this.listGuidesService.listAll();

    const formattedData = guides.map((guide) => ({
      guia_e_osm_serie: guide.osm_serie,
      guia_e_osm_num: guide.osm_num,
      guia_e_guia: guide.numGuia,
      guia_cod_tuss: guide.codTuss,
    }));

    await this.prisma.guia_exec.createMany({
      data: formattedData,
    });

    return guides;
  }
}
