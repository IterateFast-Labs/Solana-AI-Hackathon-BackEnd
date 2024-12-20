import { IsNotEmpty, IsString } from 'class-validator';
import { IsEthWalletAddress } from '../decorators/class-validator/isEthWallet.decorator';

/**
 * @summary 사용자 지갑 연결 DTO
 */
export class ConnectWalletDto {
  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsString()
  @IsEthWalletAddress()
  @IsNotEmpty()
  walletAddress: string;
}
