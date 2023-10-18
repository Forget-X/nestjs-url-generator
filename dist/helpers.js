"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendQuery = exports.signatureHasExpired = exports.isSignatureEqual = exports.generateHmac = exports.checkIfMethodHasSignedGuardDecorator = exports.getControllerMethodRoute = exports.stringifyQuery = exports.generateUrl = void 0;
const crypto_1 = require("crypto");
const qs_1 = require("qs");
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const signed_url_guard_1 = require("./signed-url-guard");
function generateUrl(appUrl, prefix, relativePath, query, params) {
    relativePath = putParamsInUrl(relativePath, params);
    const path = joinRoutes(appUrl, prefix, relativePath);
    const queryString = stringifyQuery(query);
    const fullPath = appendQuery(path, queryString);
    return fullPath;
}
exports.generateUrl = generateUrl;
function stringifyQuery(query) {
    return (0, qs_1.stringify)(query);
}
exports.stringifyQuery = stringifyQuery;
function getControllerMethodRoute(controller, controllerMethod) {
    const controllerRoute = Reflect.getMetadata(constants_1.PATH_METADATA, controller);
    const methodRoute = Reflect.getMetadata(constants_1.PATH_METADATA, controllerMethod);
    return joinRoutes(controllerRoute, methodRoute);
}
exports.getControllerMethodRoute = getControllerMethodRoute;
function checkIfMethodHasSignedGuardDecorator(controller, controllerMethod) {
    const arrOfClasses = Reflect.getMetadata(constants_1.GUARDS_METADATA, controllerMethod);
    const errorMessage = `Please add SignedUrlGuard to ${controller.name}.${controllerMethod.name}`;
    if (!arrOfClasses) {
        throw new common_1.BadRequestException(errorMessage);
    }
    const guardExist = arrOfClasses.includes(signed_url_guard_1.SignedUrlGuard);
    if (!guardExist) {
        throw new common_1.BadRequestException(errorMessage);
    }
}
exports.checkIfMethodHasSignedGuardDecorator = checkIfMethodHasSignedGuardDecorator;
function generateHmac(url, secret) {
    if (!secret) {
        throw new common_1.BadRequestException('Secret key is needed for signing URL');
    }
    const hmac = (0, crypto_1.createHmac)('sha256', secret);
    hmac.update(url, 'utf8');
    return hmac.digest('hex');
}
exports.generateHmac = generateHmac;
function isSignatureEqual(signed, hmacValue) {
    return (0, crypto_1.timingSafeEqual)(Buffer.from(signed), Buffer.from(hmacValue));
}
exports.isSignatureEqual = isSignatureEqual;
function signatureHasExpired(expirationDate) {
    const currentDate = new Date();
    return currentDate > expirationDate;
}
exports.signatureHasExpired = signatureHasExpired;
function isRouteNotEmpty(route) {
    return !!route && route !== '/';
}
function isParamsNameInUrl(route, params) {
    const routeParts = route
        .split('/')
        .filter((path) => path[0] === ':')
        .map((path) => path.substring(1));
    return Object.keys(params).every((param) => {
        return routeParts.includes(param);
    });
}
function joinRoutes(...routes) {
    return routes.filter((route) => isRouteNotEmpty(route)).join('/');
}
function appendQuery(route, query) {
    if (query) {
        return `${route}?${query}`;
    }
    return route;
}
exports.appendQuery = appendQuery;
function putParamsInUrl(route, params) {
    if (params) {
        if (isParamsNameInUrl(route, params)) {
            for (const [key, value] of Object.entries(params)) {
                route = route.replace(`:${key}`, encodeURIComponent(value));
            }
        }
        else {
            throw new common_1.BadRequestException('One of the params key does not exist in target URL');
        }
    }
    return route;
}
//# sourceMappingURL=helpers.js.map