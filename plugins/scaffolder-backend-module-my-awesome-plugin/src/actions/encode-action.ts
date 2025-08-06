import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { writeFile } from 'fs-extra';

/**
 * Creates a custom scaffolder action to encode a string and write to a file.
 */
export const createEncodeAction = () => {
  return createTemplateAction({
    id: 'util:encode',
    description: 'Encodes string and saves it to urlEncoded.txt',
    schema: {
      input: z => z.object({
        data: z.string().describe('String data to encode'),
      }),
      output: z => z.object({
        encoded: z.string(),
      }),
    },
    supportsDryRun: true,
    async handler(ctx) {
      if (ctx.isDryRun) {
        ctx.output('encoded', 'foobar');
        return;
      }

      const encoded = encodeURIComponent(ctx.input.data);

      await writeFile(`${ctx.workspacePath}/urlEncoded.txt`, encoded);

      ctx.output('encoded', encoded);
    },
  });
};
