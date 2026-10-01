(async () => {
  const content = document.querySelector('#content');
  const sourceToggle = document.querySelector('#source-toggle');
  const sourcePanel = document.querySelector('#source-panel');
  const printButton = document.querySelector('#print-button');
  sourceToggle.addEventListener('click', () => {
    const expanded = sourceToggle.getAttribute('aria-expanded') !== 'true';
    sourceToggle.setAttribute('aria-expanded', String(expanded));
    sourceToggle.textContent = expanded ? '隐藏 Markdown 源代码' : '显示 Markdown 源代码';
    sourcePanel.hidden = !expanded;
  });
  printButton.addEventListener('click', () => window.print());
  const file = new URLSearchParams(location.search).get('file');
  if (!file || !/^[a-zA-Z0-9_-]+\.md$/.test(file)) {
    content.textContent = '未找到作业.';
    return;
  }
  try {
    const response = await fetch(`assignments/${file}`);
    if (!response.ok) throw new Error('load');
    let markdown = await response.text();
    document.querySelector('#markdown-source').textContent = markdown;
    sourceToggle.disabled = false;
    const metadata = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    const fields = file === 'hw01.md' ? {
      redhead: '矩阵理论课程作业',
      'document-number': '研-MATH6005-M05-矩阵理论 〔2026〕 第 1 次作业',
      issuer: '研-MATH6005-M05-矩阵理论',
      printer: '助教: 张陈成',
      'publication-date': '2026年10月1日',
      'print-date': '2026年10月1日'
    } : {};
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
        imprint.append(issuer, date);
        content.after(imprint);
      }
    }
    document.title = `${content.querySelector('h1')?.textContent || '作业'} · 矩阵理论`;
    await MathJax.startup.promise;
    await MathJax.typesetPromise([content]);
    printButton.disabled = false;
  } catch {
    content.textContent = '加载失败,请刷新页面或返回作业列表.';
  }
})();
