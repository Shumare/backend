import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
// import { CatsModule } from './cats/cats.module';
// import { AuthModule } from './auth/auth.module';
import { HardhatModule } from './hardhat/hardhat.module';

@Module({
  imports: [UsersModule, HardhatModule],
})
export class AppModule {}
