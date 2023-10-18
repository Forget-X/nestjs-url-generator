import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UrlGeneratorService } from './url-generator.service';
export declare class SignedUrlGuard implements CanActivate {
    private readonly urlGeneratorService;
    constructor(urlGeneratorService: UrlGeneratorService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    private validateRequest;
}
//# sourceMappingURL=signed-url-guard.d.ts.map