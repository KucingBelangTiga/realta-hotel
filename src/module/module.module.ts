import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entitys } from 'output/entities/Entitys';
import { Bank } from 'output/entities/Bank';
import { PaymentGateway } from 'output/entities/PaymentGateway';
import { PaymentTransaction } from 'output/entities/PaymentTransaction';
import { UserAccounts } from 'output/entities/UserAccounts';
import { EntitysService } from 'src/payment/entitys/entitys.service';
import { EntitysController } from 'src/payment/entitys/entitys.controller';
import { BankService } from 'src/payment/bank/bank.service';
import { BankController } from 'src/payment/bank/bank.controller';
import { PaymentgatewayService } from 'src/payment/paymentgateway/paymentgateway.service';
import { PaymentgatewayController } from 'src/payment/paymentgateway/paymentgateway.controller';
import { PaymenttransactionService } from 'src/payment/paymenttransaction/paymenttransaction.service';
import { PaymenttransactionController } from 'src/payment/paymenttransaction/paymenttransaction.controller';
import { UseraccountsService } from 'src/payment/useraccounts/useraccounts.service';
import { UserAccountsController } from 'src/payment/useraccounts/useraccounts.controller';
// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { Users } from 'output/entities/Users';
// import { UserService } from 'src/user/user.service';
// import { UserController } from 'src/user/user.controller';
// import { LocalGuard } from 'src/auth/local/local.guard';
// import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bank,
      Entitys,
      PaymentGateway,
      PaymentTransaction,
      UserAccounts,
    ]),
    // PassportModule,
    // JwtModule.register({
    // secret: 'secretKey',
    // signOptions: { expiresIn: '2d' },
    // }),
  ],
  providers: [
    // LocalGuard,
    // JwtGuard,
    // UserService,
    BankService,
    EntitysService,
    PaymentgatewayService,
    PaymenttransactionService,
    UseraccountsService,
  ],
  controllers: [
    BankController,
    EntitysController,
    PaymentgatewayController,
    PaymenttransactionController,
    UserAccountsController,
  ],
  exports: [],
})
export class ModuleModule {}
