(async () => {
  const content = document.querySelector('#content');
  const sourceToggle = document.querySelector('#source-toggle');
  const sourcePanel = document.querySelector('#source-panel');
  const pdfDownload = document.querySelector('#pdf-download');
  const fontSize = document.querySelector('#font-size');
  const themeSelect = document.querySelector('#document-theme');
  sourceToggle.addEventListener('click', () => {
    const expanded = sourceToggle.getAttribute('aria-expanded') !== 'true';
    sourceToggle.setAttribute('aria-expanded', String(expanded));
    sourceToggle.textContent = expanded ? '隐藏 .md 源码' : '.md 源码';
    sourcePanel.hidden = !expanded;
  });
  const file = new URLSearchParams(location.search).get('file');
  if (!file || !/^[a-zA-Z0-9_-]+\.md$/.test(file)) {
    content.textContent = '未找到作业.';
    return;
  }
  try {
    const [response, configResponse, sizesResponse, themesResponse] = await Promise.all([
      fetch(`assignments/${file}`, {cache: 'no-cache'}),
      fetch('assignments/documents.json?v=20261014-4', {cache: 'no-cache'}),
      fetch('assignments/font-sizes.json', {cache: 'no-cache'}),
      fetch('assignments/themes.json', {cache: 'no-cache'})
    ]);
    if (!response.ok) throw new Error('load');
    let markdown = await response.text();
    document.querySelector('#markdown-source').textContent = markdown;
    sourceToggle.disabled = false;
    const metadata = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!configResponse.ok || !sizesResponse.ok || !themesResponse.ok) throw new Error('configuration');
    const documents = await configResponse.json();
    const sizes = await sizesResponse.json();
    const themes = await themesResponse.json();
    const fields = {...(documents[file] || {})};
    if (metadata) {
      for (const line of metadata[1].split(/\r?\n/)) {
        const separator = line.indexOf(':');
        if (separator > 0) fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
      }
      markdown = markdown.slice(metadata[0].length);
    }
    if (fields.redhead && fields['document-number']) {
      content.closest('main').classList.add('official-document');
      const masthead = document.createElement('header');
      masthead.className = 'document-masthead';
      const name = document.createElement('div');
      name.className = 'document-name';
      name.textContent = fields.redhead;
      const number = document.createElement('div');
      number.className = 'document-number';
      number.textContent = fields['document-number'];
      masthead.append(name, number);
      content.before(masthead);
    }
    // Protect TeX from Markdown escaping, emphasis and table parsing.
    const formulas = [];
    const protectedMarkdown = markdown.replace(/\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<!\\)\$(?!\$)(?:\\.|[^$\n])+?\$/g, formula => {
      const key = `MATHPLACEHOLDER${formulas.length}END`;
      formulas.push(formula);
      return key;
    });
    let html = marked.parse(protectedMarkdown);
    html = html.replace(/MATHPLACEHOLDER(\d+)END/g, (_, index) => formulas[index].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    content.innerHTML = html;
    // Group each solution until the next question, keeping TeX in plain Markdown.
    let solution = null;
    for (const node of Array.from(content.children)) {
      const label = node.matches('p') ? node.firstElementChild : null;
      const labelText = label?.matches('strong') ? label.textContent.trim() : '';
      if (/^问题[一二三四五六七八九十]+$|^\(\d+\)$/.test(labelText) || node.matches('h1, h2, h3')) {
        solution = null;
      }
      if (labelText === '解答.') {
        solution = document.createElement('blockquote');
        solution.className = 'solution';
        solution.setAttribute('aria-label', '解答');
        node.before(solution);
      }
      if (solution) solution.append(node);
    }
    if (fields.issuer && fields['publication-date']) {
      const signature = document.createElement('section');
      signature.className = 'document-signature';
      signature.setAttribute('aria-label', '发布单位和发布日期');
      for (const text of [fields.issuer, fields['publication-date']]) {
        const line = document.createElement('div');
        line.textContent = text;
        signature.append(line);
      }
      content.append(signature);
      if (fields['print-date']) {
        const imprint = document.createElement('footer');
        imprint.className = 'document-imprint';
        const issuer = document.createElement('span');
        issuer.textContent = fields.printer || fields.issuer;
        const date = document.createElement('span');
        date.textContent = `${fields['print-date']}发布`;
        if (fields.revision) {
          const revision = document.createElement('p');
          revision.className = 'document-revision';
          revision.textContent = fields.revision;
          imprint.append(revision);
        }
        imprint.append(issuer, date);
        content.after(imprint);
      }
    }
    document.title = `${content.querySelector('h1')?.textContent || '作业'} · 矩阵理论`;
    let savedSize;
    let savedTheme;
    try { savedSize = localStorage.getItem('matrix-theory-font-size'); } catch {}
    try { savedTheme = localStorage.getItem('matrix-theory-theme'); } catch {}
    fontSize.value = Object.hasOwn(sizes, savedSize) ? savedSize : 'default';
    themeSelect.value = Object.hasOwn(themes, savedTheme) ? savedTheme : 'blue';
    const updatePresentation = () => {
      const size = fontSize.value;
      const profile = sizes[size];
      const theme = themeSelect.value;
      const themeProfile = themes[theme];
      content.closest('main').style.setProperty('--font-scale', profile.scale);
      content.closest('main').style.setProperty('--document-color', themeProfile.color);
      if (documents[file]) {
        const suffix = (size === 'default' ? '' : `-${size}`) + (theme === 'blue' ? '' : `-${theme}`);
        pdfDownload.href = `pdf/${file.replace(/\.md$/, '')}${suffix}.pdf`;
        const title = content.querySelector('h1')?.textContent.trim() || file.replace(/\.md$/, '');
        pdfDownload.download = `${title}-${profile.label}-${themeProfile.label}.pdf`;
        pdfDownload.setAttribute('aria-label', `导出 PDF (${profile.label}字号, ${themeProfile.label})`);
        pdfDownload.hidden = false;
      }
      try { localStorage.setItem('matrix-theory-font-size', size); } catch {}
      try { localStorage.setItem('matrix-theory-theme', theme); } catch {}
    };
    fontSize.addEventListener('change', updatePresentation);
    themeSelect.addEventListener('change', updatePresentation);
    fontSize.disabled = false;
    themeSelect.disabled = false;
    updatePresentation();
    const typeset = async () => {
      try {
        await MathJax.startup.promise;
        await MathJax.typesetPromise([content]);
      } catch (error) { console.error('Formula rendering failed', error); }
    };
    if (window.MathJax?.typesetPromise) typeset();
    else window.addEventListener('mathjax-ready', typeset, {once: true});
  } catch {
    content.textContent = '加载失败,请刷新页面或返回作业列表.';
  }
})();
