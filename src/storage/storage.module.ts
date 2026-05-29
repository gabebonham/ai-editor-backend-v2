import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigModule } from '@nestjs/config';
@Global()
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
