import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const appInfraDashboardPlugin = createPlugin({
  id: 'app-infra-dashboard',
  routes: {
    root: rootRouteRef,
  },
});

export const AppInfraDashboardPage = appInfraDashboardPlugin.provide(
  createRoutableExtension({
    name: 'AppInfraDashboardPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
