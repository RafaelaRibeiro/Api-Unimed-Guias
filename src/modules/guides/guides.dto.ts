import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class createGuidesDTO {
  @IsNumber()
  guia_e_osm_serie: number;

  @IsNumber()
  guia_e_osm_num: number;

  @IsString()
  guia_e_guia: string;

  @IsString()
  @IsOptional()
  guia_cod_tuss: string;

  @IsDate()
  guia_e_dthr_reg: Date;
}

export class guidesDTO {
  @IsNumber()
  osm_serie: number;

  @IsNumber()
  osm_num: number;

  @IsString()
  osm_str: string;

  @IsString()
  osm_mcnv: string;

  @IsString()
  numGuia: string;

  @IsString()
  senha: string;

  @IsString()
  acao: string;

  @IsString()
  codTuss: string;

  @IsNumber()
  medico: number;

  @IsString()
  qt: string;
}
