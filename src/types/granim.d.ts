declare module 'granim' {
  interface GranimOptions {
    element: string | HTMLCanvasElement;
    direction?: 'diagonal' | 'left-right' | 'top-bottom' | 'radial';
    isPausedWhenNotInView?: boolean;
    states: {
      [key: string]: {
        gradients: string[][];
        transitionSpeed?: number;
        loop?: boolean;
      };
    };
    defaultStateName?: string;
    onStart?: () => void;
    onGradientChange?: (details: any) => void;
    onEnd?: () => void;
  }

  class Granim {
    constructor(options: GranimOptions);
    pause(): void;
    play(): void;
    changeState(stateName: string): void;
    destroy(): void;
  }

  export default Granim;
}
