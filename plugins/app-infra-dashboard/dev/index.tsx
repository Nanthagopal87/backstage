import { createDevApp } from '@backstage/dev-utils';
import { appInfraDashboardPlugin, AppInfraDashboardPage } from '../src/plugin';

createDevApp()
  .registerPlugin(appInfraDashboardPlugin)
  .addPage({
    element: <AppInfraDashboardPage />,
    title: 'Root Page',
    path: '/app-infra-dashboard',
  })
  .render();
