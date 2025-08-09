import { createDevApp } from '@backstage/dev-utils';
import { jsonTesterPlugin, JsonTesterPage } from '../src/plugin';

createDevApp()
  .registerPlugin(jsonTesterPlugin)
  .addPage({
    element: <JsonTesterPage />,
    title: 'Root Page',
    path: '/json-tester',
  })
  .render();
