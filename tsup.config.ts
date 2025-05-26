import { defineConfig, Options } from 'tsup';
import tailwindcss from 'esbuild-plugin-tailwindcss';
import path from 'path';

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  minify: !options.watch,
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
  platform: 'browser',
  esbuildPlugins: [
    tailwindcss(), 
  ],
  esbuildOptions(options) {
    options.mainFields = ['browser', 'module', 'main'];
    options.conditions = ['browser', 'module', 'import', 'default'];
    options.legalComments = 'none';
    options.banner = {
      js: '"use client";',
    };
  },
}));
