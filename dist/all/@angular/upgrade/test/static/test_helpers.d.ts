/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef, Type } from '@angular/core';
import * as angular from '@angular/upgrade/src/common/angular1';
import { UpgradeModule } from '@angular/upgrade/static';
export * from '../common/test_helpers';
export declare function bootstrap(platform: PlatformRef, Ng2Module: Type<{}>, element: Element, ng1Module: angular.IModule): Promise<UpgradeModule>;
export declare function $apply(adapter: UpgradeModule, exp: angular.Ng1Expression): void;
export declare function $digest(adapter: UpgradeModule): void;
