# 矩阵理论作业与答案

上海交通大学 · 2026 年秋季学期
研-MATH6005-M05-矩阵理论
教师:陈国度 · 助教:张陈成

纯静态 HTML/CSS/JavaScript,无 Ruby,无构建步骤.
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

GitHub Pages:`main` 分支根目录.
https://zhangchenchengsjtu.github.io/matrix-theory-95297-2026/

## 红头排版

视觉样板: https://www.bjxch.gov.cn/file/20220601/1654063400276033723.pdf

原件是扫描 PDF, 不包含可提取的字体或文字坐标. 版式测量记录在 `docs/layout-reference.md`.
`assignment.js` 配置红头及编号; Markdown 标题为正文标题. 正文与小问左对齐, 首行缩进两字, 回行顶格. 正文16pt仿宋, 标题22pt宋体类字形, 数学公式使用 MathJax.

按扫描图定位红线与标题, 而不是声称扫描件的尺寸与 GB/T 9704-2012 全部一致. 用户指定的课程编号, 半角标点和数学公式保持不变.

**未完全复刻的部分:** 当前没有小标宋字体, 红头使用纵向拉长的宋体近似. CSS 优先使用本地小标宋, 安装后可显示正确字形. 不将近似字体称为100%复刻. 浏览器若没有仿宋, 正文也会回退. 本地打印 PDF 可固定当前字形, 但不会将未获得分发授权的系统字体发布到仓库.

打印时选择 A4, 缩放100%, 禁用浏览器自带页眉页脚. 网页使用双面页码, 公式可能增大局部行高. 小屏幕阅读采用自适应宽度, 精确物理尺寸以 A4 打印为准.

署名和日期在 `assignment.js` 的 `issuer`, `publication-date`, `print-date` 字段配置, 也可用同名 Markdown 元数据覆盖. 日期为固定发布记录, 不随浏览时间变化. 正文末尾显示发布单位和发布日期, 末尾版记显示单位和印发日期. 版记随正文分页, 不在每页重复.
