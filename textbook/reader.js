'use strict';
const $ = selector => document.querySelector(selector);
const reader = $('#reader'), viewport = $('#viewport');
const mobile = matchMedia('(max-width: 760px)');
let headings = [], availablePages = [], currentIndex = 0, loadRevision = 0, navigationRevision = 0;
let contentRevision = '', contentBundles = [];
const bundleCache = new Map();
const pageCache = new Map();
let headingParents = [], searchIndex, searchIndexRequest, searchTimer = 0, searchRevision = 0;
let typesetQueue = Promise.resolve(), observer;
const mathJaxReady = new Promise((resolve, reject) => {
  const ready = () => MathJax.startup.promise.then(resolve, reject);
  if (window.MathJax?.typesetPromise) ready();
  else {
    const script = $('#mathjax-script');
    script.addEventListener('load', ready, {once: true});
    script.addEventListener('error', () => reject(new Error('公式渲染组件加载失败')), {once: true});
  }
});

async function getJSON(path, cache = 'no-cache') {
  const response = await fetch(path, {cache});
  if (!response.ok) throw new Error(`加载失败 (${response.status})`);
  return response.json();
}
async function getBundlePages(page) {
  const bundle = contentBundles.find(item => item.first <= page && page <= item.last);
  if (!bundle) throw new Error('正文页不存在');
  if (!bundleCache.has(bundle.path)) {
    const request = getJSON(`${bundle.path}?v=${contentRevision}`, 'default').then(pages => {
      for (const [number, source] of Object.entries(pages)) pageCache.set(Number(number), source);
      return pages;
    }).catch(error => { bundleCache.delete(bundle.path); throw error; });
    bundleCache.set(bundle.path, request);
  }
  return bundleCache.get(bundle.path);
}
async function getPageHTML(page) {
  if (!pageCache.has(page)) await getBundlePages(page);
  if (typeof pageCache.get(page) !== 'string') throw new Error('正文页加载失败');
  return pageCache.get(page);
}
function sidebarState() {
  const visible = mobile.matches ? document.body.classList.contains('sidebar-open') : !document.body.classList.contains('sidebar-closed');
  $('#sidebar').inert = !visible;
  $('#menu').setAttribute('aria-expanded', visible);
  $('#backdrop').hidden = !(mobile.matches && visible);
}
function closeDrawer() { document.body.classList.remove('sidebar-open'); sidebarState(); }
$('#menu').addEventListener('click', () => {
  document.body.classList.toggle(mobile.matches ? 'sidebar-open' : 'sidebar-closed');
  sidebarState();
  if (mobile.matches && document.body.classList.contains('sidebar-open')) $('#chapter-search').focus();
});
$('#backdrop').addEventListener('click', () => { closeDrawer(); $('#menu').focus(); });
mobile.addEventListener('change', () => { document.body.classList.remove('sidebar-open','sidebar-closed'); sidebarState(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeDrawer(); $('#menu').focus(); }
});
$('#font-size').addEventListener('change', () => document.documentElement.style.setProperty('--font-size', $('#font-size').value+'px'));

function buildNavigation() {
  const root = document.createElement('ul'), lists = [root];
  headings.forEach((heading,index) => {
    while (lists.length > heading.level) lists.pop();
    const item = document.createElement('li');
    item.dataset.title = heading.title; item.dataset.index = index;
    const link = document.createElement('a');
    link.href = '#'+heading.id; link.textContent = heading.title; link.dataset.index = index;
    if (headings[index+1]?.level > heading.level) {
      const details = document.createElement('details'), summary = document.createElement('summary'), children = document.createElement('ul');
      summary.append(link); details.append(summary,children); item.append(details);
      lists.at(-1).append(item); lists.push(children);
    } else { item.append(link); lists.at(-1).append(item); }
  });
  $('#contents').replaceChildren(root);
}
function searchTerms(value) {
  return value.trim().toLocaleLowerCase('zh-CN').split(/\s+/).map(term => term.replace(/\s/g,'')).filter(Boolean);
}
function searchText(value) { return (value || '').toLocaleLowerCase('zh-CN').replace(/\s/g,''); }
function matchesTerms(value, terms) { return terms.every(term => value.includes(term)); }
function buildHeadingParents() {
  const stack = [];
  headingParents = headings.map((heading, index) => {
    while (stack.length && headings[stack.at(-1)].level >= heading.level) stack.pop();
    const parent = stack.at(-1);
    stack.push(index); return parent;
  });
}
function showSearchStatus(text) {
  const status = $('#search-status'); status.textContent = text; status.hidden = !text;
}
function appendHighlighted(node, text, terms) {
  const escaped = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!escaped.length) { node.textContent = text; return; }
  const matcher = new RegExp(`(${escaped.join('|')})`, 'ig');
  let offset = 0;
  for (const match of text.matchAll(matcher)) {
    node.append(document.createTextNode(text.slice(offset, match.index)));
    const mark = document.createElement('mark'); mark.textContent = match[0]; node.append(mark);
    offset = match.index + match[0].length;
  }
  node.append(document.createTextNode(text.slice(offset)));
}
function resultExcerpt(entry, terms) {
  const point = Math.max(0, ...terms.map(term => entry.t.indexOf(term)));
  const start = Math.max(0, point - 30), end = Math.min(entry.t.length, point + 92);
  return `${start ? '…' : ''}${entry.t.slice(start, end)}${end < entry.t.length ? '…' : ''}`;
}
function updateContentsFilter(matches, active) {
  const visible = new Set();
  for (const index of matches) for (let current = index; current !== undefined; current = headingParents[current]) visible.add(current);
  for (const item of $('#contents').querySelectorAll('li[data-index]')) {
    const index = Number(item.dataset.index); item.hidden = active && !visible.has(index);
    const details = item.querySelector(':scope>details'); if (active && details && visible.has(index)) details.open = true;
  }
}
function renderSearchResults(results, terms) {
  const container = $('#search-results');
  if (!results.length) { container.hidden = true; container.replaceChildren(); return; }
  const list = document.createElement('ul');
  for (const result of results.slice(0,30)) {
    const item = document.createElement('li'), link = document.createElement('a');
    link.href = '#'+result.target;
    const title = document.createElement('span'); title.className = 'search-result-title'; appendHighlighted(title, headings[result.heading].title, terms);
    link.append(title);
    if (result.entry) {
      const excerpt = document.createElement('span'); excerpt.className = 'search-result-excerpt'; appendHighlighted(excerpt, resultExcerpt(result.entry, terms), terms); link.append(excerpt);
    }
    item.append(link); list.append(item);
  }
  container.replaceChildren(list); container.hidden = false;
}
async function loadSearchIndex() {
  if (searchIndex) return searchIndex;
  if (!searchIndexRequest) {
    searchIndexRequest = getJSON(`content/search-index.json?v=${contentRevision}`, 'default').then(data => {
      if (data.revision !== contentRevision) throw new Error('检索索引版本不匹配');
      searchIndex = data; return data;
    }).catch(error => { searchIndexRequest = undefined; throw error; });
  }
  return searchIndexRequest;
}
async function runSearch(revision, value) {
  const terms = searchTerms(value);
  if (!terms.length) {
    updateContentsFilter([], false); renderSearchResults([], terms); $('#no-results').hidden = true; showSearchStatus(''); return;
  }
  const headingsById = new Map(headings.map((heading, index) => [heading.id, index]));
  const results = new Map();
  headings.forEach((heading, index) => {
    if (matchesTerms(searchText(heading.title), terms)) results.set(index, {heading:index,target:heading.id});
  });
  updateContentsFilter([...results.keys()], true);
  renderSearchResults([...results.values()], terms);
  showSearchStatus('正在检索正文...');
  try {
    const index = await loadSearchIndex();
    if (revision !== searchRevision) return;
    for (const entry of index.entries) {
      if (!matchesTerms(entry.t, terms)) continue;
      const heading = headingsById.get(entry.h);
      if (heading !== undefined && !results.has(heading)) results.set(heading, {heading,target:entry.id,entry});
    }
    const found = [...results.values()];
    updateContentsFilter(found.map(result => result.heading), true);
    renderSearchResults(found, terms);
    $('#no-results').hidden = found.length > 0;
    showSearchStatus(found.length ? `找到 ${found.length} 个最细目录项${found.length > 30 ? ', 仅显示前 30 项.' : '.'}` : '');
  } catch (error) {
    if (revision !== searchRevision) return;
    const found = [...results.values()];
    $('#no-results').hidden = found.length > 0;
    showSearchStatus(found.length ? '正文关键词检索暂时不可用, 已显示目录匹配.' : '正文关键词检索暂时不可用.');
    console.error(error);
  }
}
$('#chapter-search').addEventListener('input', () => {
  clearTimeout(searchTimer); const revision = ++searchRevision, value = $('#chapter-search').value;
  if (!value.trim()) { runSearch(revision, value); return; }
  if (!headings.length) { showSearchStatus('正在加载目录...'); return; }
  searchTimer = setTimeout(() => runSearch(revision, value), 180);
});
function setActive(index) {
  $('#contents a[aria-current]')?.removeAttribute('aria-current');
  const link = $(`#contents a[data-index="${index}"]`);
  if (!link) return;
  link.setAttribute('aria-current','location');
  for (let node = link.parentElement; node && node !== $('#sidebar'); node = node.parentElement) if (node.tagName === 'DETAILS') node.open = true;
  $('#current-chapter').textContent = headings[index].title;
}
function typeset(page) {
  if (page.dataset.typeset !== 'pending') return typesetQueue;
  page.dataset.typeset = 'queued';
  typesetQueue = typesetQueue.then(async () => {
    // Navigation invalidates queued work; only an already running page must finish.
    if (!page.isConnected || Number(page.dataset.loadRevision) !== loadRevision) return;
    await mathJaxReady;
    await MathJax.typesetPromise([page]);
    page.dataset.typeset = 'complete';
  }).catch(error => {
    page.dataset.typeset = 'failed';
    console.error(error);
  });
  return typesetQueue;
}
async function loadSection(index, id = headings[index].id, headingOnly = false) {
  currentIndex = index;
  const revision = ++loadRevision;
  setActive(index); closeDrawer();
  const heading = headings[index];
  let end = Infinity;
  let nextHeading;
  for (const next of headings.slice(index+1)) if (headingOnly || next.level <= heading.level) { end = next.page; nextHeading = next; break; }
  const selected = availablePages.filter(page => page >= heading.page && page <= end);
  if (!selected.length) {
    reader.innerHTML = '<p id="load-state" role="status">本节正在转换为正文和 LaTeX 公式. 原始PDF 和 AI 字形提取版本可在“下载 PDF”中下载.</p>';
    return;
  }
  observer?.disconnect();
  await typesetQueue;
  if (revision !== loadRevision) return;
  if (window.MathJax?.typesetClear) MathJax.typesetClear([reader]);
  reader.innerHTML = '<p id="load-state" role="status">正在加载本节...</p>';
  try {
    await getBundlePages(heading.page);
    if (revision !== loadRevision) return;
    const chunks = await Promise.all(selected.map(async page => {
      const node = document.createElement('section');
      node.className = 'source-page'; node.id = `src-page-${page}`; node.dataset.typeset = 'pending';
      node.dataset.loadRevision = revision;
      node.innerHTML = await getPageHTML(page); return node;
    }));
    if (revision !== loadRevision) return;
    // A PDF boundary page can contain two sections. Keep only the chosen section's HTML.
    const startChunk = chunks[0];
    const firstHeading = startChunk.querySelector(`[id="${heading.id}"]`);
    if (firstHeading) while (startChunk.firstElementChild !== firstHeading) startChunk.firstElementChild.remove();
    const lastChunk = chunks.at(-1);
    const endHeading = nextHeading && lastChunk.querySelector(`[id="${nextHeading.id}"]`);
    if (endHeading) {
      while (endHeading.nextElementSibling) endHeading.nextElementSibling.remove();
      endHeading.remove();
    }
    if (!lastChunk.childElementCount && chunks.length > 1) chunks.pop();
    reader.replaceChildren(...chunks);
    const requestedEnd = Number.isFinite(end) ? end : 260;
    if (Array.from({length:requestedEnd-heading.page+1},(_,i)=>heading.page+i).some(page=>!availablePages.includes(page))) {
      const pending = document.createElement('p'); pending.className = 'continuation-state';
      pending.textContent = '本节后续内容正在转换.'; reader.append(pending);
    }
    const target = document.getElementById(id) || chunks[0];
    const targetPage = target.closest('.source-page');
    await typeset(targetPage || chunks[0]);
    if (revision !== loadRevision) return;
    target.scrollIntoView({block:'start'});
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { typeset(entry.target); observer.unobserve(entry.target); }
    },{root:viewport,rootMargin:'600px'});
    chunks.forEach(page => observer.observe(page));
    $('#previous').disabled = index === 0;
    $('#next').disabled = index === headings.length-1;
  } catch (error) { if (revision === loadRevision) reader.innerHTML = '<p id="load-state">正文加载失败, 请刷新页面重试.</p>'; console.error(error); }
}
async function headingForBlock(id, page) {
  const source = document.createElement('div');
  source.innerHTML = await getPageHTML(page);
  const target = source.querySelector(`[id="${id}"]`);
  if (!target) throw new Error('引用目标不存在');
  for (let node = target.previousElementSibling; node; node = node.previousElementSibling) {
    if (!/^H[123]$/.test(node.tagName)) continue;
    const index = headings.findIndex(heading => heading.id === node.id);
    if (index >= 0) return index;
  }
  // A later heading on the same source page must not capture an earlier definition.
  for (let index = headings.length-1; index >= 0; index--) if (headings[index].page < page) return index;
  return 0;
}
async function navigate(id, push = true) {
  const revision = ++navigationRevision;
  if (push) history.pushState(null,'','#'+id);
  const index = headings.findIndex(h => h.id === id);
  if (index >= 0) return loadSection(index,id);
  const block = id.match(/^src-p(\d+)-b\d+$/);
  if (block) {
    try {
      const targetIndex = await headingForBlock(id,Number(block[1]));
      if (revision !== navigationRevision) return;
      return loadSection(targetIndex,id,true);
    } catch (error) {
      if (revision !== navigationRevision) return;
      reader.innerHTML = '<p id="load-state" role="status">引用加载失败, 请刷新页面重试.</p>';
      console.error(error); return;
    }
  }
  const target = document.getElementById(id);
  if (target) { await typeset(target.closest('.source-page')); target.scrollIntoView({block:'start'}); return; }
  const sourcePage = Number(id.match(/(?:src-page-|src-p)(\d+)/)?.[1]);
  if (sourcePage) {
    let nearest = 0;
    headings.forEach((h,i) => { if (h.level === 1 && h.page <= sourcePage) nearest = i; });
    return loadSection(nearest,id);
  }
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.classList.contains('skip-link') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); navigate(link.getAttribute('href').slice(1));
});
window.addEventListener('hashchange', () => navigate(location.hash.slice(1),false));
$('#previous').addEventListener('click', () => navigate(headings[currentIndex-1].id));
$('#next').addEventListener('click', () => navigate(headings[currentIndex+1].id));

const dialog = $('#download-dialog');
let downloadRows = [];
let texStatus = 'pending';
let downloadHashes = {};
function pdfURL(file, hash) {
  const url = new URL(file, location.href);
  if (hash) url.searchParams.set('v', hash.slice(0,12));
  return url.href;
}
function renderErrata(errata) {
  const entry = $('#download-errata');
  const link = $('#errata-download');
  if (!errata?.file) { entry.hidden = true; return; }
  link.href = pdfURL(errata.file, errata.sha256);
  link.download = errata.download || 'errata.pdf';
  link.textContent = errata.title || '勘误表 PDF';
  entry.hidden = false;
}
function renderDownloads() {
  const fragment = document.createDocumentFragment();
  for (const row of downloadRows) {
    const tr = document.createElement('tr'); tr.dataset.level = row.level; tr.dataset.title = row.title;
    const name = document.createElement('th'); name.scope = 'row'; name.textContent = row.title; tr.append(name);
    for (const version of ['original','glyph','tex']) {
      const td = document.createElement('td');
      if (row.files[version]) {
        const a = document.createElement('a'); a.href = pdfURL(row.files[version],version === 'original' ? null : downloadHashes[version]); a.textContent = version === 'tex' && texStatus === 'draft' ? '下载草稿' : '下载';
        a.download = `${row.title}-${version}.pdf`; a.setAttribute('aria-label',`${row.title}, ${version}版本, 下载 PDF`); td.append(a);
      } else { const span = document.createElement('span'); span.className = 'unavailable'; span.textContent = '转换中'; td.append(span); }
      tr.append(td);
    }
    fragment.append(tr);
  }
  $('#download-rows').replaceChildren(fragment);
}
$('#downloads').addEventListener('click', async () => {
  dialog.showModal(); $('#download-state').textContent = '正在加载版本列表...';
  try {
    const data = await getJSON('../downloads/manifest.json'); downloadRows = data.rows; texStatus = data.tex_status || 'pending';
    downloadHashes = Object.fromEntries(data.versions.map(version => [version.id,version.sha256]));
    renderDownloads(); renderErrata(data.errata); $('#download-state').textContent = texStatus === 'draft' ? 'AI TeX 识别版本为转换草稿, 已按勘误修订.' : 'AI TeX 识别版本在编译完成后提供下载.';
    $('#download-search').value = '';
  } catch { $('#download-state').textContent = '版本列表加载失败, 请关闭后重试.'; }
});
$('#close-downloads').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
$('#download-search').addEventListener('input', () => {
  const query = $('#download-search').value.trim().toLowerCase().replace(/\s/g,'');
  for (const row of $('#download-rows').children) row.hidden = !!query && !row.dataset.title.toLowerCase().replace(/\s/g,'').includes(query);
});

(async () => {
  sidebarState();
  try {
    const data = await getJSON('content/manifest.json');
    headings = data.headings; availablePages = data.pages;
    contentRevision = data.revision; contentBundles = data.bundles;
    buildHeadingParents();
    buildNavigation();
    if ($('#chapter-search').value.trim()) runSearch(++searchRevision, $('#chapter-search').value);
    await navigate(location.hash.slice(1) || headings[0].id,false);
  } catch (error) { $('#load-state').textContent = '教材加载失败, 请刷新页面重试.'; console.error(error); }
})();
