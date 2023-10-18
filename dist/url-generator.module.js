"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UrlGeneratorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlGeneratorModule = void 0;
const common_1 = require("@nestjs/common");
const url_generator_service_1 = require("./url-generator.service");
const url_generator_constants_1 = require("./url-generator.constants");
let UrlGeneratorModule = UrlGeneratorModule_1 = class UrlGeneratorModule {
    static forRoot(options) {
        const urlGeneratorOptionsProvider = {
            provide: url_generator_constants_1.URL_GENERATOR_MODULE_OPTIONS,
            useValue: options,
        };
        return {
            module: UrlGeneratorModule_1,
            providers: [urlGeneratorOptionsProvider, url_generator_service_1.UrlGeneratorService],
            exports: [url_generator_service_1.UrlGeneratorService],
        };
    }
    static forRootAsync(options) {
        const providers = this.createAsyncProviders(options);
        return {
            module: UrlGeneratorModule_1,
            providers: [...providers, url_generator_service_1.UrlGeneratorService],
            imports: options.imports,
            exports: [url_generator_service_1.UrlGeneratorService],
        };
    }
    static createAsyncProviders(options) {
        const providers = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass,
            });
        }
        return providers;
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: url_generator_constants_1.URL_GENERATOR_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: url_generator_constants_1.URL_GENERATOR_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => {
                return optionsFactory.createUrlGeneratorOptions();
            },
            inject: [options.useExisting || options.useClass],
        };
    }
};
UrlGeneratorModule = UrlGeneratorModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], UrlGeneratorModule);
exports.UrlGeneratorModule = UrlGeneratorModule;
//# sourceMappingURL=url-generator.module.js.map