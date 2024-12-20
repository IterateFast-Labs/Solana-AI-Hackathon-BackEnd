import {
  ValidationArguments,
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from 'class-validator';

/**
 * @summary Check if the value is a valid Ethereum wallet address. (only lowercase)
 */
export const IsEthWalletAddress = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEthWalletAddress',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args?: ValidationArguments) {
          const pattern = /^0x[a-fA-F0-9]{40}$/;
          return pattern.test(value) && !/\s/.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property is not valid',
        ),
      },
    });
  };
};
