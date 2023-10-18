import { ControllerMethod, Query, Params, ControllerClass } from './interfaces';
export declare function generateUrl(appUrl: string, prefix: string, relativePath: string, query?: Query, params?: Params): string;
export declare function stringifyQuery(query?: Query): string;
export declare function getControllerMethodRoute(controller: ControllerClass, controllerMethod: ControllerMethod): string;
export declare function checkIfMethodHasSignedGuardDecorator(controller: ControllerClass, controllerMethod: ControllerMethod): void;
export declare function generateHmac(url: string, secret?: string): string;
export declare function isSignatureEqual(signed: string, hmacValue: string): boolean;
export declare function signatureHasExpired(expirationDate: Date): boolean;
export declare function appendQuery(route: string, query: string): string;
//# sourceMappingURL=helpers.d.ts.map