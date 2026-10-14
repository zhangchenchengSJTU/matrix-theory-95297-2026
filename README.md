# 矩阵理论课程作业

本仓库用于发布上海交通大学 2026 年秋季学期矩阵理论课程的作业, 答案及教材阅读页面.

- 课程: 研-MATH6005-M05-矩阵理论
- 教师: 陈国度
- 助教: 张陈成

[课程主页](https://zhangchenchengsjtu.github.io/matrix-theory-95297-2026/) · [Canvas](https://oc.sjtu.edu.cn/courses/95297/)

## 更新作业与 PDF

修改作业 Markdown 后, 在本地运行以下命令, 生成四档字号、三种主题色的 PDF:

```sh
python3 scripts/build_pdf.py hw02.md
```

将 Markdown 和 `pdf/` 中对应的 PDF 一起提交并推送. PDF 构建需要本地安装 Pandoc、XeLaTeX 和 latexmk; `.tex` 与日志不提交. GitHub Pages 直接发布已生成的作业 PDF, 不安装 LaTeX 或重新编译作业. 教材分章下载仍由发布流程从已有的整本 PDF 自动拆分.
