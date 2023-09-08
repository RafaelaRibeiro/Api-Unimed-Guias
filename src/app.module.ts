import { PrismaModule } from './shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuidesModule } from './modules/guides/guides.module';

@Module({
  imports: [PrismaModule, GuidesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
