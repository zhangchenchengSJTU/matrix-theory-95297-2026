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
    const markdown = await response.text();
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
