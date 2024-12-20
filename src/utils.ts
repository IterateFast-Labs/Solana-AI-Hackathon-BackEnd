import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
  ImATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  PreconditionFailedException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import * as crypto from 'crypto';
import * as fs from 'fs';
import NodeRSA from 'node-rsa';
import path from 'path';

// RSA
export function readServerRSAPrivateKeyFromEnv(): string {
  try {
    const privateKey = process.env.SERVER_RSA_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('fail to read server private key');
    }

    return privateKey;
  } catch (error) {
    throw new Error('fail to read server private key');
  }
}
export function readServerRSAPrivateKeyFromFs() {
  try {
    const targetKeyPath = path.join(
      process.cwd(),
      'resources',
      'rsa',
      'server_pk_pkcs1.pem',
    );
    const fileData = fs.readFileSync(targetKeyPath);
    return String(fileData);
  } catch (error) {
    throw new Error('fail to read server private key');
  }
}

export function getRSAServerKeyPair() {
  // const privateKey = readServerRSAPrivateKeyFromFs();
  const privateKey = readServerRSAPrivateKeyFromEnv();
  const key = new NodeRSA();

  // base64로 해도 상관없습니다! bs58이 이미 깔려있길래 base58로 했어요
  key.importKey(Buffer.from(privateKey).toString('utf8'), 'pkcs1-private-pem');
  const publicKey = key.exportKey('pkcs8-public-pem');

  return {
    encodedPublicKey: Buffer.from(publicKey).toString('base64'),
    rawPublicKey: publicKey,
    rawPrivateKey: privateKey,
  };
}

export function generateRSAKeyPair(privateKeyPassPhrase?: string) {
  const key = new NodeRSA({ b: 2048 });

  return {
    publicKey: key.exportKey('pkcs8-public-pem'),
    privateKey: privateKeyPassPhrase
      ? key.exportKey('pkcs1-private-pem', privateKeyPassPhrase)
      : key.exportKey('pkcs1-private-pem'),
  };
}

export function encryptRSAWithPublicKey(data: string, publicKey: string) {
  try {
    const key = new NodeRSA(publicKey, 'pkcs8-public-pem');
    return key.encrypt(data, 'base64');
  } catch (error) {
    throw new PreconditionFailedException('RSA encryption failed');
  }
}

export function encryptRSAWithPrivateKey(data: string, privateKey: string) {
  try {
    const key = new NodeRSA(privateKey, 'pkcs1-private-pem');
    return key.encryptPrivate(data, 'base64');
  } catch (error) {
    throw new PreconditionFailedException(
      'RSA encryption with private key failed',
    );
  }
}

export const generateSignatureWithRsaPrivateKey = (
  message: string,
  privateKey: string,
): string => {
  try {
    const sign = crypto.createSign('SHA256');
    sign.update(message, 'utf8');
    sign.end();

    const output = sign.sign(privateKey, 'base64');
    return output;
  } catch (error) {
    throw new PreconditionFailedException(
      `fail to create signature ${error.message}`,
    );
  }
};

export const verifySignatureWithRsaPublicKey = (
  plainMessage: string,
  signature: string,
  publicKey: string,
): boolean => {
  try {
    const verify = crypto.createVerify('SHA256');
    verify.update(plainMessage, 'utf8');
    verify.end();

    return verify.verify(publicKey, signature, 'base64');
  } catch (error) {
    throw new PreconditionFailedException(
      `Fail to verify signature :: ${error.message}`,
    );
  }
};

export function decryptRSAWithPrivateKey(
  encryptedData: string,
  privateKey: string,
) {
  try {
    const key = new NodeRSA(privateKey);
    return key.decrypt(encryptedData, 'utf8');
  } catch (error) {
    throw new PreconditionFailedException(
      `RSA decryption with private key failed ${error.message}`,
    );
  }
}

export function decryptRSAWithPublicKey(
  encryptedData: string,
  publicKey: string,
) {
  try {
    const key = new NodeRSA(publicKey);
    return key.decryptPublic(encryptedData, 'utf8');
  } catch (error) {
    throw new PreconditionFailedException(
      'RSA decryption with public key failed',
    );
  }
}

// AES 256
export function encryptAES256(data: string) {
  try {
    const randomString = crypto.randomBytes(32).toString('hex');

    const key = Buffer.from(randomString).subarray(0, 32);
    const iv = Buffer.from(randomString).subarray(0, 16);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypt = cipher.update(data, 'utf8', 'base64');
    encrypt += cipher.final('base64');

    return {
      data: encrypt,
      spec: randomString,
    };
  } catch (error) {
    throw new PreconditionFailedException('AES encryption failed');
  }
}

export function decryptAES256(encryptedData: string, spec: string): string {
  try {
    const key = Buffer.from(spec).subarray(0, 32);
    const iv = Buffer.from(spec).subarray(0, 16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new PreconditionFailedException('AES decryption failed');
  }
}

// SHA 256
export function sha256Hash(data: string, key?: string): string {
  if (key && key.trim().length > 0) {
    return crypto.createHmac('sha256', key).update(data).digest('hex');
  }

  return crypto.createHash('sha256').update(data).digest('hex');
}

export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0 || obj.toString() === '{}';
}

export function makeRandomAlphaNumericString(length: number): string {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function throwExceptionByHttpStatus(
  error: Required<{ statusCode: number | string; message: string }>,
  message?: string,
) {
  const errorMessage = message ? message : error.message;
  const statusCode = error.statusCode;

  switch (statusCode) {
    // switch case for status code
    case 400:
      throw new BadRequestException(errorMessage);
    case 401:
      throw new UnauthorizedException(errorMessage);
    case 403:
      throw new ForbiddenException(errorMessage);
    case 404:
      throw new NotFoundException(errorMessage);
    case 405:
      throw new MethodNotAllowedException(errorMessage);
    case 406:
      throw new NotAcceptableException(errorMessage);
    case 408:
      throw new RequestTimeoutException(errorMessage);
    case 409:
      throw new ConflictException(errorMessage);
    case 410:
      throw new GoneException(errorMessage);
    case 412:
      throw new PreconditionFailedException(errorMessage);
    case 413:
      throw new PayloadTooLargeException(errorMessage);
    case 415:
      throw new UnsupportedMediaTypeException(errorMessage);
    case 418:
      throw new ImATeapotException(errorMessage);
    case 422:
      throw new UnprocessableEntityException(errorMessage);
    case 500:
      throw new InternalServerErrorException(errorMessage);
    case 501:
      throw new NotImplementedException(errorMessage);
    case 502:
      throw new BadGatewayException(errorMessage);
    case 503:
      throw new ServiceUnavailableException(errorMessage);
    case 504:
      throw new GatewayTimeoutException(errorMessage);
    case 505:
      throw new HttpVersionNotSupportedException(errorMessage);

    default:
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function manualValidateClass(value: any, classSignature: any) {
  const instance = new classSignature();
  const valueKeys = Object.keys(value);

  for (const key of valueKeys) {
    instance[key] = value[key];
  }

  try {
    await validateOrReject(instance);
  } catch (err) {
    if (err.length > 0) {
      const constraints = err.map((error) => Object.values(error.constraints));

      throw new BadRequestException(constraints.flat());
    }
  }
}
