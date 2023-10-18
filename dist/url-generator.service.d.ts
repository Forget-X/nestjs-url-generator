import { ApplicationConfig } from '@nestjs/core';
import { UrlGeneratorModuleOptions } from './url-generator-options.interface';
import { GenerateUrlFromControllerArgs, GenerateUrlFromPathArgs, IsSignatureValidArgs, SignControllerUrlArgs, SignUrlArgs } from './interfaces';
export declare class UrlGeneratorService {
    private readonly urlGeneratorModuleOptions;
    private readonly applicationConfig;
    constructor(urlGeneratorModuleOptions: UrlGeneratorModuleOptions, applicationConfig: ApplicationConfig);
    generateUrlFromController({ controller, controllerMethod, query, params, }: GenerateUrlFromControllerArgs): string;
    generateUrlFromPath({ relativePath, query, params, }: GenerateUrlFromPathArgs): string;
    signControllerUrl({ controller, controllerMethod, expirationDate, query, params, }: SignControllerUrlArgs): string;
    signUrl({ relativePath, expirationDate, query, params, }: SignUrlArgs): string;
    isSignatureValid({ protocol, host, routePath, query, }: IsSignatureValidArgs): boolean;
}
//# sourceMappingURL=url-generator.service.d.ts.map