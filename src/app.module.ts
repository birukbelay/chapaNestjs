import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChapaModule } from 'chapa-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChapaModule.register({
      secretKey: 'CHASECK_TEST-JkVfzuCx0Uu6bpCJDWYinvxJ62dTpe3b',
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
