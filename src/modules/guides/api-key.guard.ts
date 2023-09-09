import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  private async getValidApiKey(): Promise<string | null> {
    const apiKeyRecord = await this.prisma.gCC_TOKEN.findUnique({
      where: { GCC_T_GCC_COD: '5', GCC_T_STATUS: 'A' },
      select: { gcc_t_token: true },
    });

    return apiKeyRecord?.gcc_t_token || null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API Key header is missing');
    }

    const validApiKey = await this.getValidApiKey();

    if (!validApiKey) {
      throw new NotFoundException('Valid API Key not found');
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Provided API Key is invalid');
    }

    return true;
  }
}
