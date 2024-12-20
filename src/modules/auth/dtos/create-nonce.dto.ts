import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
//import { i18nValidationMessage } from 'nestjs-i18n';
import { IsEthWalletAddress } from 'src/commons/decorators/class-validator/isEthWallet.decorator';

export class CreateNonceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
