import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
//import { Component } from 'react';

export const advicePlugin = createPlugin({
  id: 'advice',
  routes: {
    root: rootRouteRef,
  },
});

export const AdvicePage = advicePlugin.provide(
  createRoutableExtension({
    name: 'AdvicePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const AdviceCard = advicePlugin.provide(
  createComponentExtension ({
    name: 'AdviceCard',
    component: {
      lazy: () => import('./components/AdviceCard').then(m => m.AdviceCard)
    }
  }),
);

