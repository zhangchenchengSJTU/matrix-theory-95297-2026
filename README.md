# 矩阵理论作业与答案

上海交通大学 · 2026 年秋季学期
研-MATH6005-M05-矩阵理论
教师：陈国度 · 助教：张陈成

纯静态 HTML/CSS/JavaScript，无 Ruby、无构建步骤。
Markdown 使用 Marked 15.0.12 渲染，数学公式使用 MathJax 3.2.2 SVG 渲染（脚本随仓库提供）。

## 发布

将可信的作业 Markdown 放入 `assignments/`，例如 `hw01.md`。
在 `index.html` 的列表中添加链接 `assignment.html?file=hw01.md`。
答案同样使用 Markdown；未公布的答案请留在网站目录之外。
首次发布时移除“暂无作业”行。提交并推送后 Pages 自动更新。
支持 `$...$`、`$$...$$`、`\(...\)`、`\[...\]`，以及 aligned、pmatrix 等 LaTeX 数学环境。
`assignments/preview.md` 仅为排版预览，不是正式作业，未列入主页。

## 预览

```bash
python3 -m http.server 8952 --bind 127.0.0.1
```

主页：http://localhost:8952/
排版预览：http://localhost:8952/assignment.html?file=preview.md

## 部署

GitHub Pages：`main` 分支根目录。
https://zhangchenchengsjtu.github.io/matrix-theory-95297-2026/
