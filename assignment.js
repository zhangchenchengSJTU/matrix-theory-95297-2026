(async () => {
  const content = document.querySelector('#content');
  const file = new URLSearchParams(location.search).get('file');
  if (!file || !/^[a-zA-Z0-9_-]+\.md$/.test(file)) {
    content.textContent = '未找到作业.';
    return;
  }
  try {
    const response = await fetch(`assignments/${file}`);
    if (!response.ok) throw new Error('load');
    let markdown = await response.text();
    const metadata = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    const fields = file === 'hw01.md' ? {
      redhead: '矩阵理论课程作业',
      'document-number': '研-MATH6005-M05-矩阵理论 [2026] 第 1 次作业'
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
    document.title = `${content.querySelector('h1')?.textContent || '作业'} · 矩阵理论`;
    await MathJax.startup.promise;
    await MathJax.typesetPromise([content]);
  } catch {
    content.textContent = '加载失败,请刷新页面或返回作业列表.';
  }
})();
