import { Module } from '@nestjs/common';
import { GuidesService } from './services/guides.service';
import { GuidesController } from './guides.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ListGuidesService } from './services/list-guides.service';

@Module({
  imports: [PrismaModule],
  controllers: [GuidesController],
  providers: [GuidesService, ListGuidesService],
  exports: [GuidesService],
})
export class GuidesModule {}
