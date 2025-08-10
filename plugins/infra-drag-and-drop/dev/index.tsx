import { createDevApp } from '@backstage/dev-utils';
import { infraDragAndDropPlugin, InfraDragAndDropPage } from '../src/plugin';

createDevApp()
  .registerPlugin(infraDragAndDropPlugin)
  .addPage({
    element: <InfraDragAndDropPage />,
    title: 'Root Page',
    path: '/infra-drag-and-drop',
  })
  .render();
