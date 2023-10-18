import { DynamicModule } from '@nestjs/common';
import { UrlGeneratorAsyncModuleOptions, UrlGeneratorModuleOptions } from './url-generator-options.interface';
export declare class UrlGeneratorModule {
    static forRoot(options: UrlGeneratorModuleOptions): DynamicModule;
    static forRootAsync(options: UrlGeneratorAsyncModuleOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
//# sourceMappingURL=url-generator.module.d.ts.map