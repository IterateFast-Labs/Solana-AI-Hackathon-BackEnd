import { SetMetadata } from '@nestjs/common';

/**
 * @summary
 * 라우트를 퍼블릭 하게 공개할 때 사용합니다.
 * 가드의 영향을 받지 않습니다.
 */
export const IsPublic = () => SetMetadata('isPublic', true);
