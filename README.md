# 矩阵理论作业与答案

上海交通大学 · 2026 年秋季学期
研-MATH6005-M05-矩阵理论
教师:陈国度 · 助教:张陈成

网页为静态 HTML/CSS/JavaScript, 无 Ruby. PDF 从 Markdown 经 Pandoc 和 XeLaTeX 编译, 不经过 HTML.
Markdown 使用 Marked 15.0.12 渲染,数学公式使用 MathJax 3.2.2 SVG 渲染(脚本随仓库提供).

## 发布

将可信的作业 Markdown 放入 `assignments/`,例如 `hw01.md`.
在 `index.html` 的列表中添加链接 `assignment.html?file=hw01.md`.
答案同样使用 Markdown;未公布的答案请留在网站目录之外.
首次发布时移除"暂无作业"行.提交并推送后 Pages 自动更新.
支持 `$...$`,`$$...$$`,`\(...\)`,`\[...\]`,以及 aligned,pmatrix 等 LaTeX 数学环境.
`assignments/preview.md` 仅为排版预览,不是正式作业,未列入主页.

## 预览

```bash
python3 -m http.server 8952 --bind 127.0.0.1
```

主页:http://localhost:8952/
排版预览:http://localhost:8952/assignment.html?file=preview.md

## 部署

GitHub Actions 在 `main` 推送后编译 PDF, 再部署静态页面到 GitHub Pages.
https://zhangchenchengsjtu.github.io/matrix-theory-95297-2026/

## 红头排版

模板依据: 中华人民共和国国家标准 GB/T 9704-2012《党政机关公文格式》.
标准全文: https://dzb.cumtb.edu.cn/info/1040/1184.htm
此前提供的北京市司法局扫描文件仅为视觉参考.

原件是扫描 PDF, 不包含可提取的字体或文字坐标. 版式测量记录在 `docs/layout-reference.md`.
`assignments/documents.json` 统一配置网页和 PDF 的红头及编号; Markdown 标题为正文标题. 正文与小问左对齐, 首行缩进两字, 回行顶格. 正文16pt仿宋, 标题22pt宋体类字形, 数学公式使用 MathJax.

按扫描图定位红线与标题, 而不是声称扫描件的尺寸与 GB/T 9704-2012 全部一致. 用户指定的课程编号, 半角标点和数学公式保持不变.

**未完全复刻的部分:** 当前没有小标宋字体, 红头使用纵向拉长的宋体近似. CSS 优先使用本地小标宋, 安装后可显示正确字形. 不将近似字体称为100%复刻. 浏览器若没有仿宋, 正文也会回退. 源码编译的 PDF 使用 TeX Live 随附的 Fandol 仿宋/宋体, 并嵌入字体, 不受浏览器字体影响. 小标宋字形仍未完全匹配.

点击“导出 PDF”直接下载 A4 文件, 不打开打印窗口. PDF 的中文正文, 粗体, 页码和数学公式由 LaTeX 排版. 小屏幕网页仍采用自适应宽度.

署名和日期在 `assignments/documents.json` 的 `issuer`, `printer`, `publication-date`, `print-date` 字段配置, 也可用同名 Markdown 元数据覆盖. 日期为固定发布记录, 不随浏览时间变化. 正文末尾显示发布单位和发布日期, 末尾版记显示发布人和发布日期. 版记随正文分页, 不在每页重复.

## 从源码生成 PDF

安装 Pandoc, XeLaTeX, latexmk 和 TeX Live 中文支持后运行:

```bash
python3 scripts/build_pdf.py hw01.md
```

生成 `pdf/hw01.pdf`, 同时保留 `.tex` 和 `.log` 供检查. 版式模板为 `templates/homework.tex`. PDF 是文字和矢量公式, 不是网页截图. 编译失败, 缺字或 overfull 报告会阻止发布. 修改本地 Markdown 后需重新运行编译命令; 在线部署由 GitHub Actions 自动编译已提交的源码.
