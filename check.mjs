import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const source=fs.readFileSync('app.js','utf8'),dictionary=fs.readFileSync('i18n.js','utf8'),html=fs.readFileSync('index.html','utf8');
const context=vm.createContext({document:{querySelector(){return {focus(){}}}},navigator:{language:'en'},localStorage:{getItem(){return null}}});
vm.runInContext(dictionary+'\n'+source.slice(0,source.indexOf("$('#next').onclick=next;")),context);
vm.runInContext('render=()=>{};',context);
const locales=vm.runInContext('Object.keys(messages)',context);const keys=vm.runInContext('Object.keys(messages.en).sort()',context);
for(const language of locales){assert.equal(JSON.stringify(vm.runInContext(`Object.keys(messages[${JSON.stringify(language)}]).sort()`,context)),JSON.stringify(keys));vm.runInContext(`locale=${JSON.stringify(language)}`,context);for(const task of ['add','edit','assign']){const count=vm.runInContext(`tasks.${task}.length`,context);for(let i=0;i<count;i++){const output=vm.runInContext(`task='${task}';goStep(${i});consoleHTML()`,context);assert.ok(!output.includes('undefined'));const target=vm.runInContext('tasks[task][index][2]',context);assert.ok(output.includes(`data-target="${target}"`),`${language}/${task}/${i} target exists`);}}}
for(const m of html.matchAll(/data-i18n="([^"]+)"/g))assert.ok(keys.includes(m[1]),m[1]);
assert.ok(!fs.readdirSync('.').some(n=>/\.(png|jpe?g|webp)$/i.test(n)),'No screenshot assets in deployment');assert.ok(!/<img|https?:\/\/.*\.(png|jpg)/.test(html));
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const asset=match[1];if(asset.startsWith('https:'))continue;assert.ok(!asset.startsWith('/')&&fs.existsSync(asset),'Project-relative asset exists: '+asset);}
for(const file of ['index.html','app.js','i18n.js','style.css','console.css'])assert.ok(!/console-reference|NEO|China Telecom|183\.13\.|202\.96\./i.test(fs.readFileSync(file,'utf8')),'No original identifying content in '+file);
vm.runInContext('task="assign";goStep(1);',context);
for(const language of locales){vm.runInContext(`locale=${JSON.stringify(language)};dropdownOpen=true;selectedSLA='profile';`,context);const menu=vm.runInContext('slaMenu()',context);assert.equal((menu.match(/role="option"/g)||[]).length,3);assert.equal((menu.match(/aria-selected="true"/g)||[]).length,1);for(const key of ['auto','profile','backupProfile']){vm.runInContext(`task='assign';goStep(1);chooseSLA('${key}')`,context);assert.equal(vm.runInContext('selectedSLA',context),key);assert.equal(vm.runInContext('dropdownOpen',context),false);vm.runInContext('toggleDropdown()',context);assert.equal(vm.runInContext('dropdownOpen',context),true);}}
vm.runInContext('task="assign";goStep(1)',context);
assert.equal(vm.runInContext('selectedSLA',context),'auto');
assert.match(vm.runInContext('slaMenu()',context),/aria-selected="true" data-sla="auto"/);
vm.runInContext("chooseSLA('profile')",context);assert.equal(vm.runInContext('index',context),2);assert.equal(vm.runInContext('appliedSLA',context),'auto');assert.ok(vm.runInContext('consoleHTML()',context).includes('data-target="apply"'));
vm.runInContext('cancelSLA()',context);assert.equal(vm.runInContext('selectedSLA',context),'auto');assert.ok(!vm.runInContext('consoleHTML()',context).includes('data-target="apply"'));
vm.runInContext("chooseSLA('profile');applySLA()",context);assert.equal(vm.runInContext('index',context),3);assert.equal(vm.runInContext('appliedSLA',context),'profile');assert.ok(!vm.runInContext('consoleHTML()',context).includes('data-target="apply"'));
console.log('Passed: 45 localized steps, translation parity, Auto default, selection/pending/apply/cancel/verify transitions, no original identifying content.');
