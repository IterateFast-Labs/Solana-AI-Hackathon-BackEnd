<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

## Description

Nest framework for IF-Labs Server.

## Project setup

1. Install dependencies

```bash
$ yarn install
```

2. Add server rsa private key file

```bash
$ mkdir -p resorces/rsa/
cd resorces/rsa/
touch server_pk_pkcs1.pem
```

3. DB setup

```bash
$ docker-compose up -d
$ yarn db-setup
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

General Error Object Format

```json
{
  "message": "error message with i18n",
  "statusCode": "Http error code",
  "timestamp": "timestamp",
  "path": "request path"
}
```