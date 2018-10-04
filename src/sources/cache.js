import cacheManager from 'cache-manager';
import fsCacheStore from 'cache-manager-fs';
import os from 'os';
import path from 'path';

export default cacheManager.caching({
  store: fsCacheStore,
  options: {
    ttl: 60 * 60 * 24,
    path: path.resolve(os.homedir(), '.devdocs-cli/cache')
  }
});
