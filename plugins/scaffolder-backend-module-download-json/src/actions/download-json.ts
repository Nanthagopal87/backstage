import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
//import { z } from 'zod';
/**
 * Creates a custom scaffolder action to encode a string and write to a file.
 */
export const createDownloadJsonAction = () => {
  return createTemplateAction({
    id: 'util:download-json',
    description: 'Mocke download a JSON file',
    schema: {
      input: z => z.object({
        repoUrl: z.string().describe('GitLab repository URL'),
        filePath: z.string().describe('Path to the JSON file in the workspace'),
    }),
      output: z => z.object({
        json: z.record(z.any()).describe('The downloaded JSON file'),
      }),
    },
    
    async handler(ctx) {
      const { repoUrl, filePath } = ctx.input;

      ctx.logger.info(`Downloading JSON file from ${repoUrl}/${filePath}`);

      //Mock the update operation
      const mockjson = {
        "downloaded": true,
         filePath,
         repoUrl,
         "timestamp": new Date().toISOString(),
      };
       
      ctx.output('json', mockjson);
    },
  });
};
