import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createGuidesDTO {
  @ApiProperty()
  @IsNumber()
  osm_serie: number;

  @IsNumber()
  @ApiProperty()
  osm_num: number;

  @IsString()
  @ApiProperty()
  guia: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  senha: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  guia_cod_tuss: string;

  @IsDate()
  @ApiProperty()
  guia_e_dthr_reg: Date;
}

export class guidesDTO {
  @IsNumber()
  @ApiProperty()
  osm_serie: number;

  @IsNumber()
  @ApiProperty()
  osm_num: number;

  @IsString()
  @ApiProperty()
  osm_str: string;

  @IsString()
  @ApiProperty()
  osm_mcnv: string;

  @IsString()
  @ApiProperty()
  numGuia: string;

  @IsString()
  @ApiProperty()
  senha: string;

  @IsString()
  @ApiProperty()
  acao: string;

  @IsString()
  @ApiProperty()
  codTuss: string;

  @IsNumber()
  @ApiProperty()
  medico: number;

  @IsString()
  @ApiProperty()
  qt: string;
}
