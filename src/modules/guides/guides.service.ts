import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { guidesDTO } from './guides.dto';

@Injectable()
export class GuidesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const guides: guidesDTO[] = await this.prisma.$queryRaw`
    select 
     osm_serie,
     osm_num,
      osm_str, 
      osm_mcnv,  
      isnull(smm_ctle_cnv,iif(psv_unimedbh_cod = 'S','',convert( varchar(10), osm_serie) + convert(varchar(10), osm_num)) ) as numGuia, 
      smm_senha as senha,  
      'E' as acao,
      null as codTuss,
      0 as medico,
      0 as qt
      from osm 
      inner join smm on osm_serie = smm_osm_serie and osm_num = smm_osm 
      inner join cnv on osm_cnv = cnv_cod 
      inner join psv on osm_mreq = psv_cod
      left JOIN guia_exec ON osm_serie = guia_exec.guia_e_osm_serie AND osm_num = guia_exec.guia_e_osm_num AND  isnull(smm_ctle_cnv,iif(psv_unimedbh_cod = 'S','',convert( varchar(10), osm_serie) + convert(varchar(10), osm_num)) )  = guia_exec.guia_e_guia

      where 
      osm_str in ('19', 'RCC') and 
      osm_dthr >= '2023-09-22' and
      (smm_ind_prt = 'N' or smm_ind_prt is null) and 
      cnv_caixa_fatura = 'F' and
      smm_ctle_cnv IS NOT NULL and      
      guia_exec.guia_e_guia IS NULL and
      smm_exec not in ('C','P')

      group by osm_serie, osm_num,osm_str,osm_mcnv,isnull(smm_ctle_cnv,iif(psv_unimedbh_cod = 'S','',convert( varchar(10), osm_serie) + convert(varchar(10), osm_num)) ), smm_senha

      union all
      select 
      osm_serie, 
      osm_num,
      osm_str, 
      osm_mcnv,  
      convert( varchar(10), osm_serie) + convert(varchar(10), osm_num),
      smm_senha, 
      'GE', 
      smm_pre_ccv, 
      psv_crm, 
      smm_qt
      from osm 
      inner join smm on osm_serie = smm_osm_serie and osm_num = smm_osm 
      inner join cnv on osm_cnv = cnv_cod 
      inner join psv on osm_mreq = psv_cod
      left JOIN guia_exec ON osm_serie = guia_exec.guia_e_osm_serie AND osm_num = guia_exec.guia_e_osm_num  AND  convert( varchar(10), osm_serie) + convert(varchar(10), osm_num) = guia_exec.guia_e_guia
      where 
      osm_str in ('19', 'RCC') and 
      osm_dthr >= '2023-09-22' and
      (smm_ind_prt = 'N' or smm_ind_prt is null) and 
      cnv_caixa_fatura = 'F' and
      psv_unimedbh_cod is null and
      smm_ctle_cnv is NULL and
      guia_exec.guia_e_guia IS null and
      smm_exec not in ('C','P')
      group by osm_serie, osm_num, osm_str, osm_mcnv,convert( varchar(10), osm_serie) + convert(varchar(10), osm_num), smm_senha, smm_pre_ccv, psv_crm, smm_qt
    `;

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
