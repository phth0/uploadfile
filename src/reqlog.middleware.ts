import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

let reqN = 0;
@Injectable()
export class ReqlogMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const inT = Date.now();
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const data = response.get('body');
      const t = Date.now() - inT;
      if (url + baseUrl == '/') return;
      console.log(
        `[${reqN++}-t:${t}]${method} ${url} ${baseUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${data}`
      );
    });

    next();
  }
}
