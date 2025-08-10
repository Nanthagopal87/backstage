import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const infraDragAndDropPlugin = createPlugin({
  id: 'infra-drag-and-drop',
  routes: {
    root: rootRouteRef,
  },
});

export const InfraDragAndDropPage = infraDragAndDropPlugin.provide(
  createRoutableExtension({
    name: 'InfraDragAndDropPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
