declare module 'miew' {
  interface Representation {
    selector?: string;
    mode?: string;
    colorer?: string;
    material?: string;
  }

  interface Settings {
    ao?: boolean;
    axes?: boolean;
    editing?: boolean;
    fog?: boolean;
    fps?: boolean;
    fxaa?: boolean;
    maxfps?: number;
    pick?: 'atom' | 'residue' | 'chain' | 'molecule';
    picking?: boolean;
    resolution?: 'ultra' | 'high' | 'medium' | 'low' | 'poor';
    zooming?: boolean;
  }

   interface Opts {
    container?: HTMLElement | null;
    load?: string;
    settings?: Settings;
    reps: Representation[];
  }

  interface LoadOpts {
    sourceType?: string;
    fileType?: string;
    mdFile?: string;
    keepRepsInfo?: boolean;
  }

  interface GetStateOpts {
    compact?: boolean;
    settings?: boolean;
    view?: boolean;
  }

  export interface State {
    load: string;
    reps: Representation[];
    view?: string;
  }

   export default class Miew {
     constructor(opts: Opts);

     init(): boolean;

     run(): void;

     enableHotKeys(enabled: boolean): void;

     set(params: string | object, value?: any): void;

     get<T>(param: string, value?: T): T;

     load(source: string | File, opts?: LoadOpts): Promise<void>;

     screenshot(width?: number, height?: number): string;

     rep(index: number, rep?: Representation): void | Representation;

     rep(rep?: Representation): void | Representation;

     repCount(): number;

     resetReps(preset?: string): void;

     script(cmd: string, cb: (str: string) => void, err: (str: string) => void): void;

     getPalettes(): any;

     getState(opts?: GetStateOpts): State;

     view(exp?: string): string | void;
   }
}
