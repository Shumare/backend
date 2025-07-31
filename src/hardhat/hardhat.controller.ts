import { Controller, Post } from '@nestjs/common';
import { HardhatService } from './hardhat.service';

@Controller('hardhat')
export class HardhatController {
  constructor(private readonly hardhatService: HardhatService) {}

  @Post('node/start')
  startNode() {
    return this.hardhatService.startNode();
  }

  @Post('node/stop')
  stopNode() {
    return this.hardhatService.stopNode();
  }

  @Post('deploy')
  deploy() {
    return this.hardhatService.deployContract();
  }

  @Post('compile')
  compile() {
    return this.hardhatService.compileContract();
  }
}
