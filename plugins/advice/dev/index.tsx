import { createDevApp } from '@backstage/dev-utils';
import { advicePlugin, AdvicePage } from '../src/plugin';

createDevApp()
  .registerPlugin(advicePlugin)
  .addPage({
    element: <AdvicePage />,
    title: 'Root Page',
    path: '/advice',
  })
  .render();
