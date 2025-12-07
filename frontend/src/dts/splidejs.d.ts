declare module '@splidejs/react-splide';

declare module 'react-splidejs' {
  import type { EventMap, Options, Splide } from '@splidejs/splide';
  export type SplideOptions = Options;
  export type onReady = (
    splide: Splide,
    ...args: Parameters<EventMap['ready']>
  ) => ReturnType<EventMap['ready']>;
}
