---
redhead: 矩阵理论课程作业
document-number: 研-MATH6005-M05-矩阵理论 〔2026〕 第 5 次作业参考答案
issuer: 研-MATH6005-M05-矩阵理论
printer: 助教: 张陈成
publication-date: 2026年11月15日
print-date: 2026年11月15日
---

# 第五次作业参考答案


**问题一** 斜坐标下的镜面反射.

在通常的直角坐标系中, 两个向量的内积就是对应坐标乘积的和. 如果改用一组不相互垂直的基, 直接这样计算就可能出错. 下面以镜面反射为例, 看看换一组基后, 变换的矩阵表示会有什么变化.

在通常的欧氏空间 $\mathbb R^3$ 中, 取基 $\mathcal B=(b_1,b_2,b_3)$, 其中
$$
b_1=\left(\begin{smallmatrix}1\\1\\0\end{smallmatrix}\right),\qquad
b_2=\left(\begin{smallmatrix}0\\1\\1\end{smallmatrix}\right),\qquad
b_3=\left(\begin{smallmatrix}1\\0\\1\end{smallmatrix}\right).
$$
记 $G=(b_i\cdot b_j)_{3\times3}$. 对 $v=\left(\begin{smallmatrix}1\\2\\2\end{smallmatrix}\right)$, 定义线性变换
$$
Tx=x-2\frac{x\cdot v}{v\cdot v}\,v.
$$

**(1)** 求 $G$ 以及 $T$ 在基 $\mathcal B$ 下的矩阵 $M$, 即 $(Tb_1,Tb_2,Tb_3)=(b_1,b_2,b_3)M$.

**解答.** 令 $B=(b_1,b_2,b_3)$, 则
$$
B=\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix},\qquad
G=B^TB=\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}.
$$
直角坐标下的反射矩阵为
$$
H=I-\frac29vv^T
=\frac19\begin{pmatrix}7&-4&-4\\-4&1&-8\\-4&-8&1\end{pmatrix}.
$$
逐列计算可得
$$
Tb_1=\left(\begin{smallmatrix}1/3\\-1/3\\-4/3\end{smallmatrix}\right),\quad
Tb_2=\left(\begin{smallmatrix}-8/9\\-7/9\\-7/9\end{smallmatrix}\right),\quad
Tb_3=\left(\begin{smallmatrix}1/3\\-4/3\\-1/3\end{smallmatrix}\right).
$$
它们是直角坐标, 还需分别展开到基 $\mathcal B$ 下. 由 $BM=HB$, 得
$$
\boxed{M=B^{-1}HB=
\begin{pmatrix}2/3&-4/9&-1/3\\-1&-1/3&-1\\-1/3&-4/9&2/3\end{pmatrix}.}
$$

**(2)** 求伴随变换 $T^*$ 在同一基下的矩阵 $N$, 并判断 $T$ 是否为自伴变换. 比较 $N$ 与 $M^T$.

**解答.** 若 $x=B\xi$, $y=B\eta$, 则 $x\cdot y=\xi^TG\eta$. 由伴随定义 $(Tx)\cdot y=x\cdot(T^*y)$, 对所有 $\xi,\eta$ 有
$$
\xi^TM^TG\eta=\xi^TGN\eta.
$$
因此 $M^TG=GN$, 即 $N=G^{-1}M^TG$.

另一方面, 直接由反射公式,
$$
(Tx)\cdot y=x\cdot y-\frac29(x\cdot v)(v\cdot y)
=x\cdot(Ty).
$$
所以 $T^*=T$, 即 $T$ 自伴. 在同一组基下, 它们的矩阵也相同:
$$
\boxed{N=M.}
$$
但 $N_{12}=-4/9$, 而 $(M^T)_{12}=-1$, 因此 $\boxed{N\ne M^T}$. 自伴变换在斜基下的矩阵不一定普通对称; 相应条件是 $M^TG=GM$.

**(3)** 判断 $T$ 是否为保距变换, 并判断 $M$ 是否为正交矩阵. 解释这两个判断是否必须一致, 即, 保距变换在任意一组基下的表示矩阵是否一定是正交矩阵.

**解答.** 将 $x$ 正交分解为 $x=x_\perp+\lambda v$, 其中 $x_\perp\cdot v=0$. 由定义,
$$
Tx=x_\perp-\lambda v,\qquad
\|Tx\|^2=\|x_\perp\|^2+\lambda^2\|v\|^2=\|x\|^2.
$$
又因为 $T$ 线性, $\|Tx-Ty\|=\|T(x-y)\|=\|x-y\|$. 所以 $T$ 是保距变换.

然而, $M$ 第一列的普通模长平方为
$$
(2/3)^2+(-1)^2+(-1/3)^2=14/9\ne1,
$$
故 $\boxed{M\text{ 不是正交矩阵}}$.

这两个判断不必一致. 在当前基下, 保距对应的是 $\boxed{M^TGM=G}$; 普通正交对应 $M^TM=I$. 若基为标准正交基, 则 $G=I$, 两种条件一致. 本题的斜基不能直接用坐标的普通点积计算原空间内积.


**问题二** 交替投影与数据校正.

一组数据需要满足两个条件. 我们轮流用正交投影调整数据, 每次让它满足其中一个条件. 但满足了一个条件, 可能又不满足另一个条件. 这样反复调整, 最后能否同时满足两个条件?

在通常的欧氏空间 $\mathbb R^3$ 中, 设
$$
\begin{aligned}
U&=\left\{\left(\begin{smallmatrix}x_1\\x_2\\x_3\end{smallmatrix}\right):x_3=0\right\},\\
W&=\left\{\left(\begin{smallmatrix}x_1\\x_2\\x_3\end{smallmatrix}\right):x_1+x_2+x_3=0\right\}.
\end{aligned}
$$
分别用 $P,Q$ 表示向 $U,W$ 的正交投影矩阵, 记 $C=PQ$.

从任意初值 $x^{(0)}=\left(\begin{smallmatrix}a\\b\\c\end{smallmatrix}\right)$ 出发, 每一轮先投影到 $W$, 再投影到 $U$, 即
$$
x^{(m+1)}=Cx^{(m)}\qquad(m=0,1,2,\ldots).
$$

**(1)** 求 $P,Q$ 以及 $C$, 并判断 $C$ 是否为正交投影矩阵.

**解答.** 投影到 $U$ 只需将第三个坐标置零, 所以
$$
\boxed{P=\begin{pmatrix}1&0&0\\0&1&0\\0&0&0\end{pmatrix}.}
$$
$W$ 的法向量为 $n=\left(\begin{smallmatrix}1\\1\\1\end{smallmatrix}\right)$. 减去沿 $n$ 的分量, 得
$$
\boxed{Q=I-\frac{nn^T}{n^Tn}
=\frac13\begin{pmatrix}2&-1&-1\\-1&2&-1\\-1&-1&2\end{pmatrix}.}
$$
每轮先作用 $Q$, 再作用 $P$, 故
$$
\boxed{C=PQ=\frac13\begin{pmatrix}2&-1&-1\\-1&2&-1\\0&0&0\end{pmatrix}.}
$$
由于 $C_{13}=-1/3$, $C_{31}=0$, 有 $C\ne C^T$, 所以 $C$ 不是正交投影矩阵. 两个正交投影的乘积未必仍为正交投影.

**(2)** 求 $\operatorname{Im}C$ 和 $\operatorname{Ker}C$ 的各一组基及维数.

**解答.** $C$ 第三行全为零, 因此 $\operatorname{Im}C\subseteq U$. 又因为左上角二阶子式为 $(4-1)/9=1/3\ne0$, 所以 $\operatorname{rank}C=2$. 因而
$$
\boxed{\operatorname{Im}C=U,\qquad\dim\operatorname{Im}C=2,}
$$
一组基可取
$$
\left(\begin{smallmatrix}1\\0\\0\end{smallmatrix}\right),\qquad
\left(\begin{smallmatrix}0\\1\\0\end{smallmatrix}\right).
$$
解 $Cx=0$, 得 $2x_1-x_2-x_3=0$, $-x_1+2x_2-x_3=0$, 即 $x_1=x_2=x_3$. 所以
$$
\boxed{\operatorname{Ker}C=\operatorname{span}\left\{\left(\begin{smallmatrix}1\\1\\1\end{smallmatrix}\right)\right\},
\qquad\dim\operatorname{Ker}C=1.}
$$

**(3)** 求 $m\ge1$ 时 $x^{(m)}$ 的表达式及其极限.

**解答.** 记 $x^{(m)}=\left(\begin{smallmatrix}u_m\\w_m\\z_m\end{smallmatrix}\right)$. 第一轮给出
$$
u_1=\frac{2a-b-c}{3},\qquad
w_1=\frac{-a+2b-c}{3},\qquad z_1=0.
$$
从第一轮起, 第三个坐标均为零. 因此对 $m\ge1$,
$$
u_{m+1}=\frac{2u_m-w_m}{3},\qquad
w_{m+1}=\frac{-u_m+2w_m}{3}.
$$
两式相减、相加, 分别得
$$
u_{m+1}-w_{m+1}=u_m-w_m,\qquad
u_{m+1}+w_{m+1}=\frac{u_m+w_m}{3}.
$$
结合第一轮的差与和, 对所有 $m\ge1$ 有
$$
u_m-w_m=a-b,\qquad
u_m+w_m=\frac{a+b-2c}{3^m}.
$$
由和、差还原坐标, 得
$$
\boxed{x^{(m)}=
\frac{a-b}{2}\left(\begin{smallmatrix}1\\-1\\0\end{smallmatrix}\right)
+\frac{a+b-2c}{2\cdot3^m}\left(\begin{smallmatrix}1\\1\\0\end{smallmatrix}\right),\qquad m\ge1.}
$$
这里仍保留了初值 $c$ 对有限轮结果的影响. 令 $m\to\infty$, 得
$$
\boxed{x^{(\infty)}=\left(\begin{smallmatrix}(a-b)/2\\(b-a)/2\\0\end{smallmatrix}\right).}
$$

**(4)** 证明该极限是 $x^{(0)}$ 在 $U\cap W$ 上的正交投影.

**解答.** 联立两个子空间的约束,
$$
\begin{gathered}
U\cap W=\{x:x_3=0,\ x_1+x_2=0\},\\
U\cap W=\operatorname{span}\{t\},\qquad
 t=\left(\begin{smallmatrix}1\\-1\\0\end{smallmatrix}\right).
\end{gathered}
$$
初值在这条直线上的正交投影为
$$
\operatorname{proj}_{U\cap W}x^{(0)}
=\frac{x^{(0)}\cdot t}{t\cdot t}t
=\frac{a-b}{2}\left(\begin{smallmatrix}1\\-1\\0\end{smallmatrix}\right)
=x^{(\infty)}.
$$
因此, 反复进行两次投影的极限, 正是初值在交空间上的正交投影.

**注记** 每一轮的 $C$ 本身不是投影到交空间的矩阵. 但其矩阵幂满足
$$
\lim_{m\to\infty}C^m
=\frac12\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix},
$$
这个极限矩阵才是交空间上的正交投影矩阵.

