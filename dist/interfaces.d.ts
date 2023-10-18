import { Request } from 'express';
import { Controller } from '@nestjs/common/interfaces';
export interface ControllerClass extends Controller {
    name: string;
}
export type ControllerMethod = (...args: any[]) => Promise<any> | any;
export interface Query {
    [key: string]: any;
}
export interface Params {
    [key: string]: string;
}
export interface ReservedQuery {
    signed?: string;
    expirationDate?: string;
}
type SignedQuery = Query & ReservedQuery;
type Not<T> = {
    [Key in keyof T]?: never;
};
type NotReservedQuery = Query & Not<ReservedQuery>;
export interface RequestWithSignature extends Request {
    query: SignedQuery;
}
export interface GenerateUrlFromControllerArgs {
    controller: ControllerClass;
    controllerMethod: ControllerMethod;
    query?: Query;
    params?: Params;
}
export interface GenerateUrlFromPathArgs {
    relativePath: string;
    query?: Query;
    params?: Params;
}
export interface SignControllerUrlArgs {
    controller: ControllerClass;
    controllerMethod: ControllerMethod;
    expirationDate?: Date;
    query?: NotReservedQuery;
    params?: Params;
}
export interface SignUrlArgs {
    relativePath: string;
    expirationDate?: Date;
    query?: NotReservedQuery;
    params?: Params;
}
export interface IsSignatureValidArgs {
    protocol: string;
    host: string;
    routePath: string;
    query: SignedQuery;
}
export {};
//# sourceMappingURL=interfaces.d.ts.map