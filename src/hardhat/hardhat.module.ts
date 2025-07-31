import { Module } from '@nestjs/common';
import { HardhatController } from './hardhat.controller';
import { HardhatService } from './hardhat.service';

@Module({
  controllers: [HardhatController],
  providers: [HardhatService],
})
export class HardhatModule {}
