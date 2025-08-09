import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const jsonTesterPlugin = createPlugin({
  id: 'json-tester',
  routes: {
    root: rootRouteRef,
  },
});

export const JsonTesterPage = jsonTesterPlugin.provide(
  createRoutableExtension({
    name: 'JsonTesterPage',
    component: () =>
      import('./components/JsonTesterPage').then(m => m.JsonTesterPage),
    mountPoint: rootRouteRef,
  }),
);
