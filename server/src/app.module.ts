import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './db/typeorm.config';

// import { AuthModule } from './modules/auth/auth.module';
// import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(typeOrmConfig), // Desativado por enquanto
    // (Não incluir UserModule ou AuthModule aqui agora)
  ],
})
export class AppModule {}
