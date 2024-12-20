import {
  ValidationArguments,
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from 'class-validator';

/**
 * @summary Check if the value is a valid Ethereum contract address.
 */
export const IsEthTxHash = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEthTxHash',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args?: ValidationArguments) {
          const pattern = /^0x[a-f0-9]{64}$/;
          return pattern.test(value) && !/\s/.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property is not valid',
        ),
      },
    });
  };
};
