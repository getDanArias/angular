
import {Type} from '@angular/core';
import {Data, ResolveData, Route} from '../src/config';
import {ActivatedRouteSnapshot} from '../src/router_state';
import {UrlSegment, UrlSegmentGroup, UrlTree, equalSegments} from '../src/url_tree';
import {PRIMARY_OUTLET, ParamMap, Params, convertToParamMap} from '../src/shared';

export class Logger {
  logs: string[] = [];
  add(thing: string) { this.logs.push(thing); }
}

export function provideTokenLogger(token: string) {
  return {
    provide: token,
    useFactory: (logger: Logger) => () => (logger.add(token), true),
    deps: [Logger]
  };
};

export function createActivatedRouteSnapshot(cmp: string, extra: any = {}): ActivatedRouteSnapshot {
  return new ActivatedRouteSnapshot(
      <any>[], {}, <any>null, <any>null, <any>null, <any>null, <any>cmp, <any>{}, <any>null, -1,
      extra.resolve);
}

function x({name}: {name: string}) {

}

export declare type ARSArgs = {
  url?: UrlSegment[],
  params?: Params,
  queryParams?: Params,
  fragment?: string,
  data?: Data,
  outlet?: string,
  component: Type<any>|string|null,
  routeConfig?: Route|null,
  urlSegment?: UrlSegmentGroup,
  lastPathIndex?: number,
  resolve?: ResolveData
};

export function createActivatedRouteSnapshot2(args: ARSArgs): ActivatedRouteSnapshot {
  return new ActivatedRouteSnapshot(args.url || <any>[], args.params || {}, args.queryParams || <any>null,
    args.fragment || <any>null, args.data || <any>null, args.outlet || <any>null, <any>args.component,
    args.routeConfig || <any>{}, args.urlSegment || <any>null, args.lastPathIndex || -1, args.resolve || {});
}
