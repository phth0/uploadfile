import { Injectable, NestMiddleware } from '@nestjs/common';
import { InterfaceType } from '@nestjs/graphql';

import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/log.service';

let reqN = 0;
@Injectable()
export class ReqlogMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const inT = Date.now();
    logger().setContext(`${reqN++}`);
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const data = response.get('body');
      const t = Date.now() - inT;
      logger().setContext(``);
      if (url + baseUrl == '/') return;
      logger().log(
        `[${reqN}-t:${t}]${method} ${url} ${baseUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${data}`
      );
    });

    next();
  }
}
