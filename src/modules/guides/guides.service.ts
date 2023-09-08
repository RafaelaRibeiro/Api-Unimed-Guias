import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class GuidesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const guides = await this.prisma.$queryRaw`
    select 
      osm_mcnv,  
      isnull(smm_ctle_cnv,iif(psv_unimedbh_cod = 'S','',convert( varchar(10), osm_serie) + convert(varchar(10), osm_num)) ) as numGuia, 
      smm_senha as senha,  
      'E' as acao,'' as codTuss,0 as medico,0 as qt
      from osm 
      inner join smm on osm_serie = smm_osm_serie and osm_num = smm_osm 
      inner join cnv on osm_cnv = cnv_cod 
      inner join psv on osm_mreq = psv_cod
      where osm_str in ('19', 'RCC') and convert(date, osm_dthr) = dateadd(day, -1,convert(date, getdate())) and (smm_ind_prt = 'N' or smm_ind_prt is null) and cnv_caixa_fatura = 'F' and
      smm_ctle_cnv is not null
      group by osm_mcnv,isnull(smm_ctle_cnv,iif(psv_unimedbh_cod = 'S','',convert( varchar(10), osm_serie) + convert(varchar(10), osm_num)) ), smm_senha

        union all
      select 
      osm_mcnv,  
      convert( varchar(10), osm_serie) + convert(varchar(10), osm_num),
      smm_senha, 'GE', smm_pre_ccv, psv_crm, smm_qt
      from osm 
      inner join smm on osm_serie = smm_osm_serie and osm_num = smm_osm 
      inner join cnv on osm_cnv = cnv_cod 
      inner join psv on osm_mreq = psv_cod
      where osm_str in ('19', 'RCC') and convert(date, osm_dthr) = dateadd(day, -1,convert(date, getdate())) and (smm_ind_prt = 'N' or smm_ind_prt is null) and cnv_caixa_fatura = 'F' and
      psv_unimedbh_cod is null and
      smm_ctle_cnv is null
      group by osm_mcnv,convert( varchar(10), osm_serie) + convert(varchar(10), osm_num), smm_senha, smm_pre_ccv, psv_crm, smm_qt
    `;

    return guides;
  }
}
