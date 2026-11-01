import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as lucide from 'lucide-react';
import * as esm from 'nexus-icons-unified';
import {build} from 'esbuild';
const require=createRequire(import.meta.url);
const cjs=require('nexus-icons-unified');

for(const [format,library,source] of [['ESM',esm,lucide],['CommonJS',cjs,require('lucide-react')]]) {
 test(format+' listed/searchable names resolve to the actual icon',()=>{
  assert.ok(library.getAvailableIcons().includes('arrowupright'));
  for(const name of ['arrowupright','ArrowUpRight','arrow-up-right'])assert.equal(library.getIcon(name),source.ArrowUpRight);
  assert.equal(library.getIcon('nexus-create'),source.Wand2);
  assert.ok(library.searchIcons('nexus').includes('nexus-create'));
 });
 test(format+' malformed/unknown names retain the safe fallback',()=>{
  for(const name of [null,undefined,{},'not-a-real-icon','__proto__','constructor','toString'])assert.equal(library.getIcon(name),source.HelpCircle);
  assert.deepEqual(library.searchIcons(null),[]);
 });
 test(format+' packaged component renders without a consumer JSX loader',()=>{
  const html=renderToStaticMarkup(React.createElement(library.Icon,{name:'arrow-up-right','aria-label':'Synthetic direction'}));
  assert.match(html,/<svg/);assert.match(html,/Synthetic direction/);
 });
}
test('static named imports avoid the dynamic full-registry bundle',async()=>{
 const bundle=async symbol=>{
  const result=await build({stdin:{contents:`import {${symbol}} from 'nexus-icons-unified'; console.log(${symbol});`,resolveDir:process.cwd()},bundle:true,format:'esm',platform:'browser',minify:true,external:['react'],write:false,logLevel:'silent'});
  return result.outputFiles[0].contents.byteLength;
 };
 const named=await bundle('ArrowUpRight'),dynamic=await bundle('Icon');
 assert.ok(named<dynamic,`Expected static named import (${named}) smaller than dynamic registry (${dynamic})`);
 console.log(JSON.stringify({staticNamedBytes:named,dynamicRegistryBytes:dynamic,scope:'Pinned local browser fixture; React external'}));
});
