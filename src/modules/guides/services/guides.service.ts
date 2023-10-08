import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { createGuidesDTO } from '../guides.dto';

@Injectable()
export class GuidesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(guides: createGuidesDTO[]) {
    try {
      const now = new Date();
      const formattedData = guides.map((guide) => ({
        guia_e_osm_serie: guide.osm_serie,
        guia_e_osm_num: guide.osm_num,
        guia_e_guia: guide.guia,
        guias_e_senha: guide.senha,
        guia_cod_tuss: guide.guia_cod_tuss,
        guia_e_dthr_reg: now,
      }));

      await this.prisma.guia_exec.createMany({
        data: formattedData,
      });

      return guides;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar guias',
        error.message,
      );
    }
  }
}
