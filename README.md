# 矩阵理论课程作业

上海交通大学, 2026 年秋季学期. 研-MATH6005-M05-矩阵理论.
教师: 陈国度. 助教: 张陈成.

[课程主页](https://zhangchenchengsjtu.github.io/matrix-theory-95297-2026/) · [Canvas](https://oc.sjtu.edu.cn/courses/95297/) · [GitHub 仓库](https://github.com/zhangchenchengSJTU/matrix-theory-95297-2026)

网站用于布置作业和公布答案, 支持数学公式排版、查看 Markdown 源代码和下载 PDF. 桌面端内容宽度为窗口的 50%, 小屏幕自适应, 网页宽度不影响 PDF 排版.

## 编辑与发布

第一周作业源文件为 [`assignments/hw01.md`](assignments/hw01.md). 直接修改 Markdown, 提交并推送到 `main` 后, GitHub Actions 自动生成 PDF 并部署网站. 推送成功后还需等待部署完成, 线上内容才会更新.

新增作业或答案时:

1. 将 Markdown 文件放入 `assignments/`, 使用如 `hw02.md` 的文件名.
2. 在 [`assignments/documents.json`](assignments/documents.json) 中添加同名配置, 设置红头、作业编号、署名和发布日期. 配置中的文件会自动生成 PDF.
3. 在 [`index.html`](index.html) 中添加或更新链接, 格式为 `assignment.html?file=hw02.md`.
4. 提交并推送修改, 在仓库的 Actions 页面确认部署成功.

仓库为公开仓库. 尚未公布的答案应保存在仓库之外.

Markdown 的一级标题作为作业标题, 粗体使用 `**问题一**`. 支持 `$...$` 和 `$$...$$` 等数学公式, 以及 `pmatrix`、`aligned` 等 LaTeX 数学环境. `documents.json` 配置也可通过 Markdown 文件开头的同名元数据字段覆盖.

## 本地预览

在仓库根目录运行:

```bash
python3 -m http.server 8952 --bind 127.0.0.1
```

打开 [本地主页](http://localhost:8952/) 或 [第一周作业](http://localhost:8952/assignment.html?file=hw01.md). 本地修改正文后, 需单独重新生成 PDF.

## 生成 PDF

PDF 由 Markdown 经 Pandoc、XeLaTeX 直接编译, 不经过 HTML 或网页截图. 在 Ubuntu 上安装依赖:

```bash
sudo apt-get install pandoc latexmk texlive-xetex texlive-lang-chinese texlive-latex-extra texlive-fonts-recommended fonts-texgyre
python3 scripts/build_pdf.py hw01.md
```

不指定文件名时, 编译 `documents.json` 中的全部文件. 输出位于 `pdf/`, 包含 PDF、LaTeX 源文件和编译日志, 不纳入 Git. 编译失败、缺字或内容超出版心会阻止部署.

## 排版依据

参考[国务院公报《党政机关公文处理工作条例》](https://www.gov.cn/gongbao/content/2013/content_2344541.htm)和[国家标准 GB/T 9704-2012《党政机关公文格式》](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F3CC9BEF482524C895FDA7A08BB4A70E).

PDF 使用 A4 纸, 上边距 37mm、下边距 35mm、左边距 28mm、右边距 26mm. 正文为 16pt 仿宋, 行距 30pt. 使用 TeX Live 的 Fandol 仿宋和宋体, 字体嵌入 PDF. 红头以宋体近似小标宋, 并非完全复刻. 网页字体取决于设备安装的字体.

网页采用静态 HTML/CSS/JavaScript, Markdown 和公式分别由随仓库提供的 Marked、MathJax 渲染. PDF 模板为 [`templates/homework.tex`](templates/homework.tex), 部署流程为 [`.github/workflows/pages.yml`](.github/workflows/pages.yml).
