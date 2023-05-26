import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entitys } from 'output/entities/Entitys';
import { Bank } from 'output/entities/Bank';
import { PaymentGateway } from 'output/entities/PaymentGateway';
import { PaymentTransaction } from 'output/entities/PaymentTransaction';
import { UserAccounts } from 'output/entities/UserAccounts';
import { BankService } from 'src/payment/bank/bank.service';
import { BankController } from 'src/payment/bank/bank.controller';
import { PaymentgatewayService } from 'src/payment/paymentgateway/paymentgateway.service';
import { PaymentgatewayController } from 'src/payment/paymentgateway/paymentgateway.controller';
import { PaymenttransactionService } from 'src/payment/paymenttransaction/paymenttransaction.service';
import { PaymenttransactionController } from 'src/payment/paymenttransaction/paymenttransaction.controller';
import { UseraccountsService } from 'src/payment/useraccounts/useraccounts.service';
import { UserAccountsController } from 'src/payment/useraccounts/useraccounts.controller';
import { TopupService } from 'src/payment/topup/topup.service';
import { TopupController } from 'src/payment/topup/topup.controller';
// import { PaymentGatewayService } from 'src/payment-gateway/payment-gateway.service';
// import { PaymentGatewayController } from 'src/payment-gateway/payment-gateway.controller';
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
      // Users,
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
    PaymentgatewayService,
    PaymenttransactionService,
    UseraccountsService,
    TopupService,
  ],
  controllers: [
    BankController,
    PaymentgatewayController,
    PaymenttransactionController,
    UserAccountsController,
    TopupController,
  ],
  exports: [],
})
export class ModuleModule {}
