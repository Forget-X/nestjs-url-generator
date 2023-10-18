"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlGeneratorService = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const url_generator_constants_1 = require("./url-generator.constants");
const helpers_1 = require("./helpers");
let UrlGeneratorService = class UrlGeneratorService {
    constructor(urlGeneratorModuleOptions, applicationConfig) {
        this.urlGeneratorModuleOptions = urlGeneratorModuleOptions;
        this.applicationConfig = applicationConfig;
        if (this.urlGeneratorModuleOptions.secret) {
            const byteLength = Buffer.byteLength(this.urlGeneratorModuleOptions.secret);
            if (byteLength < 32) {
                common_1.Logger.warn('[urlGeneratorModuleOptions] The key size is recommended to be between 32-64 bytes');
            }
        }
        const url = new URL(this.urlGeneratorModuleOptions.appUrl);
        if (!['http:', 'https:'].includes(url.protocol)) {
            throw Error('Protocol is required in url');
        }
    }
    generateUrlFromController({ controller, controllerMethod, query, params, }) {
        const controllerMethodFullRoute = (0, helpers_1.getControllerMethodRoute)(controller, controllerMethod);
        return this.generateUrlFromPath({
            relativePath: controllerMethodFullRoute,
            query,
            params,
        });
    }
    generateUrlFromPath({ relativePath, query, params, }) {
        return (0, helpers_1.generateUrl)(this.urlGeneratorModuleOptions.appUrl, this.applicationConfig.getGlobalPrefix(), relativePath, query, params);
    }
    signControllerUrl({ controller, controllerMethod, expirationDate, query, params, }) {
        (0, helpers_1.checkIfMethodHasSignedGuardDecorator)(controller, controllerMethod);
        const controllerMethodFullRoute = (0, helpers_1.getControllerMethodRoute)(controller, controllerMethod);
        return this.signUrl({
            relativePath: controllerMethodFullRoute,
            expirationDate,
            query,
            params,
        });
    }
    signUrl({ relativePath, expirationDate, query, params, }) {
        const cloneQuery = Object.assign({}, query);
        if (expirationDate) {
            cloneQuery.expirationDate = expirationDate.toISOString();
        }
        const urlWithoutHash = (0, helpers_1.generateUrl)(this.urlGeneratorModuleOptions.appUrl, this.applicationConfig.getGlobalPrefix(), relativePath, cloneQuery, params);
        cloneQuery.signed = (0, helpers_1.generateHmac)(urlWithoutHash, this.urlGeneratorModuleOptions.secret);
        const urlWithHash = (0, helpers_1.generateUrl)(this.urlGeneratorModuleOptions.appUrl, this.applicationConfig.getGlobalPrefix(), relativePath, cloneQuery, params);
        return urlWithHash;
    }
    isSignatureValid({ protocol, host, routePath, query, }) {
        const { signed, ...restQuery } = query;
        const path = `${protocol}://${host}${routePath}`;
        const queryString = (0, helpers_1.stringifyQuery)(restQuery);
        const fullPath = (0, helpers_1.appendQuery)(path, queryString);
        const hmac = (0, helpers_1.generateHmac)(fullPath, this.urlGeneratorModuleOptions.secret);
        if (!signed || !hmac || signed.length != hmac.length) {
            throw new common_1.ForbiddenException('Invalid Url');
        }
        else {
            if (restQuery.expirationDate) {
                const expirationDate = new Date(restQuery.expirationDate);
                if ((0, helpers_1.signatureHasExpired)(expirationDate))
                    return false;
            }
            return (0, helpers_1.isSignatureEqual)(signed, hmac);
        }
    }
};
UrlGeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(url_generator_constants_1.URL_GENERATOR_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, core_1.ApplicationConfig])
], UrlGeneratorService);
exports.UrlGeneratorService = UrlGeneratorService;
//# sourceMappingURL=url-generator.service.js.map