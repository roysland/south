import esbuild from "esbuild";
import sass from 'esbuild-plugin-sass'
esbuild
  .build({
    entryPoints: ['./src/south.scss'],
    bundle: true,
    outfile: './dist/bundle.css',
    plugins: [sass()],
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write("data: update\n\n"));
        clients.length = 0;
        console.log(error ? error : "...");
      },
    },
  })
  .catch(() => process.exit(1));