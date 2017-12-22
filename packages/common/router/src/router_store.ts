
import {Params} from './shared';
import {RouteConfig, NormalizedRouteConfig} from './config';

export interface RouterState {
  configToId: [RouteConfig, number][],
  configs: {
    [key: string]: NormalizedRouteConfig;
  }
}

export class RouterStore {
  private _nextId = 0;
  constructor(private state: RouterState) {

  }

  getState() {
    return this.state;
  }

  private nextId() {
    return ++this._nextId;
  }

  addConfig(config: RouteConfig): number {
    const id = this.nextId();

    let normalized: NormalizedRouteConfig = {
      ...config,
      id,
      children: this.addConfigs(config.children || [])
    };

    let state = this.getState();
    this.state = {
      ...state,
      configToId: [...state.configToId, [config, id]],
      configs: {...state.configs, [id]: normalized}
    };
    return id;
  }

  addConfigs(configs: RouteConfig[]): number[] {
    return configs.map(config => {
      return this.addConfig(config);
    });
  }
}

export function getConfig(state: RouterState, idOrConfig: number | RouteConfig): NormalizedRouteConfig|null {
  if (typeof idOrConfig === 'number') {
    return state.configs[idOrConfig] || null;
  } else {
    const tuple = state.configToId.find(tuple => tuple[0] === idOrConfig);
    return tuple ? getConfig(state, tuple[1]) : null;
  }
}
