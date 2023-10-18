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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedUrlGuard = void 0;
const common_1 = require("@nestjs/common");
const url_generator_service_1 = require("./url-generator.service");
let SignedUrlGuard = class SignedUrlGuard {
    constructor(urlGeneratorService) {
        this.urlGeneratorService = urlGeneratorService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    validateRequest(request) {
        if (!request.headers.host) {
            throw new common_1.MethodNotAllowedException('Unable to derive host name from request');
        }
        if (!request.path) {
            throw new common_1.MethodNotAllowedException('Unable to derive path from request');
        }
        if (!request.query) {
            throw new common_1.MethodNotAllowedException('Signed Query is invalid');
        }
        return this.urlGeneratorService.isSignatureValid({
            protocol: request.protocol,
            host: request.headers.host,
            routePath: request.path,
            query: request.query,
        });
    }
};
SignedUrlGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [url_generator_service_1.UrlGeneratorService])
], SignedUrlGuard);
exports.SignedUrlGuard = SignedUrlGuard;
//# sourceMappingURL=signed-url-guard.js.map