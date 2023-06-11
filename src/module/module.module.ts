import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entitys } from 'output/entities/Entitys';
import { Bank } from 'output/entities/Bank';
import { PaymentGateway } from 'output/entities/PaymentGateway';
import { PaymentTransaction } from 'output/entities/PaymentTransaction';
import { UserAccounts } from 'output/entities/UserAccounts';
import { Users } from 'output/entities/Users';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bank,
      Entitys,
      PaymentGateway,
      PaymentTransaction,
      UserAccounts,
      Users,
    ]),
  ],
  providers: [
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
