import {build} from 'esbuild';
const shared={entryPoints:['index.js'],bundle:true,loader:{'.js':'jsx'},jsx:'transform',platform:'neutral',target:'es2019',external:['react','lucide-react'],legalComments:'eof'};
await build({...shared,format:'esm',outfile:'dist/index.mjs'});
await build({...shared,format:'cjs',outfile:'dist/index.cjs'});
