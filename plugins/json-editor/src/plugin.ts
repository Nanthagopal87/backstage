import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const jsonEditorPlugin = createPlugin({
  id: 'json-editor',
  routes: {
    root: rootRouteRef,
  },
});

export const JsonEditorPage = jsonEditorPlugin.provide(
  createRoutableExtension({
    name: 'JsonEditorPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
