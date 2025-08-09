import { jsonTesterPlugin } from './plugin';

describe('json-tester', () => {
  it('should export plugin', () => {
    expect(jsonTesterPlugin).toBeDefined();
  });
});
