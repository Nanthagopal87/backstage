import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
//import { z } from 'zod';
/**
 * Creates a custom scaffolder action to encode a string and write to a file.
 */
export const createUpdateAutovarsAction = () => {
  return createTemplateAction({
    id: 'util:update-json',
    description: 'Mocke update a JSON file',
    schema: {
      input: z => z.object({
        repoUrl: z.string().describe('GitLab repository URL'),
        filePath: z.string().describe('Path to the JSON file in the workspace'),
        updates: z.record(z.any()).describe('key-value pairs to update in the JSON file'),
      }),
      output: z => z.object({
        updatedJson: z.record(z.any()).describe('The updated JSON content'),
      }),
    },
    supportsDryRun: true,
    async handler(ctx) {
      const { repoUrl, filePath, updates } = ctx.input;

      ctx.logger.info(`Updating JSON file at ${filePath} with updates: ${JSON.stringify(updates)}`);

      //Mock the update operation
      const originalJson = {
        "name": "example",
        "description": "This is an example JSON file",
         filePath,
         repoUrl,
      };
       
     const updatedJson = {
      ...originalJson,
      ...updates
     }
      ctx.output('updatedJson', updatedJson);
    },
  });
};
