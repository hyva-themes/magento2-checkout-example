const fs = require('fs');

/**
 * This webpack resolver plugin will be used to use the ReactApp files
 * available in the src/ directory instead of the same file available
 * in Hyva_Checkout module. The paths and filename must be matched in order
 * to work it correctly.
 */
class HyvaInheritancePlugin {
  constructor(options) {
    this.name = options.name || 'HyvaInheritancePlugin';
    this.parentPath = options.parentPath;
    this.childPath = options.childPath || __dirname;
    this.fileExtensions = options.fileExtensions || [
      '.jsx',
      '.js',
      '.json',
      '.ts',
      '.graphql',
    ];
  }

  apply(resolver) {
    const target = resolver.ensureHook('existing-file');
    resolver
      .getHook('raw-file')
      .tapAsync(this.name, (request, resolveContext, callback) => {
        const currentPath = request.path;

        if (
          !currentPath.includes(this.childPath) &&
          !currentPath.includes(this.parentPath)
        ) {
          return callback();
        }

        const newPath = this.resolveFile(
          currentPath.replace(this.parentPath, this.childPath)
        );
        if (!this.fileExists(newPath)) {
          return callback();
        }

        const newResolverObject = {
          ...request,
          path: newPath,
          request: undefined,
        };

        return resolver.doResolve(
          target,
          newResolverObject,
          `resolved by ${this.name} to ${newPath}`,
          resolveContext,
          callback
        );
      });
  }

  fileExists(path) {
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      return false;
    }

    if (fs.existsSync(path)) {
      return true;
    }

    let fileExists = false;

    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + fileExtension)) {
        fileExists = true;
      }
    });

    return fileExists;
  }

  resolveFile(path) {
    let file = path;

    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + fileExtension)) {
        file = path + fileExtension;
      }
    });

    if (file !== path) {
      return file;
    }

    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(`${path}/index${fileExtension}`)) {
        file = `${path}/index${fileExtension}`;
      }
    });

    return file;
  }
}

module.exports = HyvaInheritancePlugin;
