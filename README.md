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

## 排版

参考 GB/T 9704-2012 的公文正文风格: 二号小标宋标题, 三号仿宋正文, 首行缩进两字. 打印采用 A4, 上37mm/右26mm/下35mm/左28mm 页边距. 保留半角标点和 LaTeX 数学字形. 本站为课程作业, 仅借用正文排版, 并非完整公文格式. 浏览器需安装仿宋和小标宋以显示指定字体, 缺失时回退到宋体类字体.

### 红头作业页

`assignment.js` 中配置第一周作业的红头及编号; 其他作业也可在 Markdown 开头用 `redhead` 和 `document-number` 字段覆盖. 参照 GB/T 9704-2012: 标志上缘距版心上缘35mm, 编号在标志下空两行, 编号下4mm为等宽红线, 正文标题在红线下空两行. 以30pt作为公文的一行. 有序列表取消悬挂缩进, 首行缩进两字, 回行顶格. 序号后的一个半角空格为本站排版约定, 不是国标规定的固定空格数. 用户指定的编号和半角标点为课程自定义格式, 不声称完整符合公文标准.
