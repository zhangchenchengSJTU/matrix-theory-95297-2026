---
redhead: 矩阵理论课程作业
document-number: 研-MATH6005-M05-矩阵理论 〔2026〕 第 1 次作业参考答案
---

# 第一次作业参考答案

**问题一** 对矩阵
$$
A = \begin{pmatrix} 2&4&1&8&-1\\ 3&6&2&13&1\\ 1&2&-2&-1&3 \end{pmatrix}
$$
施行初等行变换, 将其化为 Hermite 标准形 $H_A$.

**(1)** 请依照矩阵的列线性关系写出 $H_A$, 不得使用行初等变换. 可以参考教材 **定理 1.2.1.** 的证明思路.

**解答.** 记 $a_j$ 为 $A$ 的第 $j$ 列, $h_j$ 为 $H_A$ 的第 $j$ 列. 我们使用贪心算法, **逐列输入 $A$ 的列, 逐列输出 $H_A$ 的列**: 从左至右, 每输入一列 $a_j$, 就判断它能否由此前已选出的主元列线性表示. 若能, 就用相同的系数组合此前输出的对应主元列, 得到 $h_j$; 若不能, 就将第 $j$ 列选为新的主元列, 并输出下一个标准基向量. 每一步只使用当前列和此前已选出的主元列.

- 第一列 $a_1=\left(\begin{smallmatrix}2\\3\\1\end{smallmatrix}\right)$ 非零, 所以 $H_A$ 的第一列是 $h_1=\left(\begin{smallmatrix}1\\0\\0\end{smallmatrix}\right)$, 这也是第一个主元列.
- 第二列可以用前面的主元列线性表示, 即 $a_2=2a_1$, 所以 $H_A$ 的第二列是 $h_2=2h_1=\left(\begin{smallmatrix}2\\0\\0\end{smallmatrix}\right)$.
- 第三列 $a_3=\left(\begin{smallmatrix}1\\2\\-2\end{smallmatrix}\right)$ 不能用前面的主元列 $a_1$ 线性表示, 因为它不是 $a_1$ 的倍数, 所以 $H_A$ 的第三列是 $h_3=\left(\begin{smallmatrix}0\\1\\0\end{smallmatrix}\right)$, 这也是第二个主元列.
- 第四列可以用前面的主元列 $a_1,a_3$ 线性表示, 即 $a_4=3a_1+2a_3$, 所以 $H_A$ 的第四列是 $h_4=3h_1+2h_3=\left(\begin{smallmatrix}3\\2\\0\end{smallmatrix}\right)$.
- 第五列 $a_5=\left(\begin{smallmatrix}-1\\1\\3\end{smallmatrix}\right)$ 不能用前面的主元列 $a_1,a_3$ 线性表示, 因为 $\det(a_1,a_3,a_5)=16\ne0$, 所以 $H_A$ 的第五列是 $h_5=\left(\begin{smallmatrix}0\\0\\1\end{smallmatrix}\right)$, 这也是第三个主元列.

将逐列输出的结果拼在一起, 得到
$$
\boxed{
H_A=\begin{pmatrix}
1&2&0&3&0\\
0&0&1&2&0\\
0&0&0&0&1
\end{pmatrix}.}
$$
令 $L=(a_1,a_3,a_5)$, 则上述列关系给出 $A=LH_A$, 且 $L$ 可逆. 所得 $H_A$ 已满足简化行阶梯形的条件, 因而正是 $A$ 的 Hermite 标准形.

**(2)** 比较 $A$ 与 $H_A$ 的四个基本子空间, 分别说明哪些相同, 哪些不同.

**解答.** 固定数域 $\mathbb F\in\{\mathbb Q,\mathbb R,\mathbb C\}$. 这里用 $R(A)$ 表示列空间, 用 $R(A^T)$ 表示行空间, 用 $N(A)$ 和 $N(A^T)$ 分别表示零空间和左零空间.

由于 $A=LH_A$ 且 $L$ 可逆, 两个矩阵的零空间和行空间相同. 本题两者的秩均为 $3$, 所以列空间均为 $\mathbb F^3$, 左零空间均为 $\{0\}$. 四个空间全部相同:

| 基本子空间 | $A$ 与 $H_A$ 的共同空间 | 维数 |
| --- | --- | --- |
| 列空间 | $R(A)=R(H_A)=\mathbb F^3$ | $3$ |
| 零空间 | $N(A)=N(H_A)$ | $2$ |
| 行空间 | $R(A^T)=R(H_A^T)$ | $3$ |
| 左零空间 | $N(A^T)=N(H_A^T)=\{0\}$ | $0$ |

具体地, 方程 $Ax=0$ 等价于
$$
x_1+2x_2+3x_4=0,\qquad x_3+2x_4=0,\qquad x_5=0.
$$
因此共同的零空间为
$$
N(A)=N(H_A)
=\operatorname{span}_{\mathbb F}\left\{
\left(\begin{smallmatrix}-2\\1\\0\\0\\0\end{smallmatrix}\right),
\left(\begin{smallmatrix}-3\\0\\-2\\1\\0\end{smallmatrix}\right)
\right\}.
$$
共同的行空间为
$$
R(A^T)=R(H_A^T)
=\operatorname{span}_{\mathbb F}\left\{
\left(\begin{smallmatrix}1\\2\\0\\3\\0\end{smallmatrix}\right),
\left(\begin{smallmatrix}0\\0\\1\\2\\0\end{smallmatrix}\right),
\left(\begin{smallmatrix}0\\0\\0\\0\\1\end{smallmatrix}\right)
\right\}.
$$
**一般的初等行变换保持行空间和零空间, 列空间及左零空间则未必保持. 本题列空间和左零空间也相同, 是因为矩阵满行秩.**

**(3)** 分别将 $A$ 视为实数域, 复数域和有理数域上的矩阵, 讨论 $H_A$ 是否依赖于数域的选择, 并说明理由.

**解答.** 上述列关系的系数均为有理数, 而子式 $\det(a_1,a_3,a_5)=16$ 在 $\mathbb Q,\mathbb R,\mathbb C$ 中均非零. 因此, 三个数域上的主元列和各列坐标均相同, 得到的 $H_A$ 完全一致.

相应的基本子空间仍需按底域理解. 同一组有理向量在三个数域上分别取有理线性包, 实线性包和复线性包. 它们的维数和上述基向量相同. 例如, 三种情形的列空间分别为 $\mathbb Q^3,\mathbb R^3,\mathbb C^3$.

**问题二** 设 $A$ 为实矩阵, $A^T$ 为其转置矩阵.

**(1)** 说明 $A$ 与 $A^T$ 的四个基本子空间之间的关系.

**解答.** 设 $A\in\mathbb R^{m\times n}$.

转置后, 四个基本子空间按以下方式交换:

- **列空间与行空间交换:** $A^T$ 的列空间就是 $A$ 的行空间 $R(A^T)$; $A^T$ 的行空间就是 $A$ 的列空间 $R(A)$.
- **零空间与左零空间交换:** $A^T$ 的零空间就是 $A$ 的左零空间 $N(A^T)$; $A^T$ 的左零空间就是 $A$ 的零空间 $N(A)$.

此外,
$$
R(A^T)=N(A)^\perp,\qquad
R(A)=N(A^T)^\perp.
$$
例如, $x\in R(A^T)^\perp$ 当且仅当对任意 $y\in\mathbb R^m$ 都有
$$
x\cdot(A^Ty)=(Ax)\cdot y=0,
$$
也就是 $Ax=0$. 因而 $R(A^T)^\perp=N(A)$, 取正交补即得第一式; 第二式同理. 两个环境空间分别具有正交直和分解
$$
\mathbb R^n=R(A^T)\oplus N(A),\qquad
\mathbb R^m=R(A)\oplus N(A^T).
$$

**(2)** 说明 $A$ 与 $A^T A$ 的四个基本子空间之间的关系.

**解答.** 对任意 $x\in\mathbb R^n$, 有
$$
x^T(A^TA)x=x^TA^TAx=\|Ax\|^2.
$$
若 $A^TAx=0$, 则 $\|Ax\|^2=0$, 从而 $Ax=0$. 反之, $Ax=0$ 显然蕴含 $A^TAx=0$. 因此
$$
N(A^TA)=N(A).
$$
由于 $A^TA$ 对称,
$$
\begin{aligned}
R(A^TA)=R((A^TA)^T)&=N(A^TA)^\perp\\
&=N(A)^\perp=R(A^T),\\
N((A^TA)^T)&=N(A^TA)=N(A).
\end{aligned}
$$
因此, $A^TA$ 的四个基本子空间可以分成两组:

- **列空间和行空间:** 两者都等于 $A$ 的行空间, 即
  $$
  R(A^TA)=R((A^TA)^T)=R(A^T)\subseteq\mathbb R^n.
  $$
- **零空间和左零空间:** 两者都等于 $A$ 的零空间, 即
  $$
  N(A^TA)=N((A^TA)^T)=N(A)\subseteq\mathbb R^n.
  $$

注意各空间所属的环境空间. $A$ 的列空间与 $A^TA$ 的列空间一般没有相等关系; 当 $m\ne n$ 时, 二者还属于不同的环境空间.

**问题三** 设 $U_1$, $U_2$ 与 $U_3$ 为线性空间 $V$ 的子空间.

**(1)** 若 $U_1 + U_2 + U_3 = V$, 且 $U_1 \cap U_2 \cap U_3 = 0$, 是否必有 $V = U_1 \oplus U_2 \oplus U_3$? 请证明或给出反例.

**解答.** 不一定成立. 取 $V=\mathbb R^2$, 令
$$
U_1=\operatorname{span}\{e_1\},\qquad
U_2=\operatorname{span}\{e_2\},\qquad
U_3=\operatorname{span}\{e_1+e_2\}.
$$
三个子空间的和为 $V$, 任意两个的交均为 $\{0\}$, 因而三者的交也为 $\{0\}$. 但是
$$
e_1+e_2-(e_1+e_2)=0
$$
给出一个非平凡的三项关系, 三个非零项分别属于 $U_1,U_2,U_3$. 零向量的分解不唯一, 所以总和不是直和.

**(2)** 若 $U_1 + U_2 + U_3 = V$, 且 $U_1 \cap U_2 = U_2 \cap U_3 = U_3 \cap U_1 = 0$, 是否必有 $V = U_1 \oplus U_2 \oplus U_3$? 请证明或给出反例.

**解答.** 不一定成立. 沿用第 (1) 问中的反例, $U_1+U_2+U_3=V$, 且 $U_1\cap U_2=U_2\cap U_3=U_3\cap U_1=\{0\}$. 但是 $e_1+e_2-(e_1+e_2)=0$ 仍给出一个非平凡的三项关系, 所以总和不是直和.

**(3)** 给出 $V = U_1 \oplus U_2 \oplus U_3$ 成立的充要条件.

**解答.** $V=U_1\oplus U_2\oplus U_3$ 当且仅当以下两条同时成立:

1. $U_1+U_2+U_3=V$.
2. 若 $u_i\in U_i$ 且 $u_1+u_2+u_3=0$, 则 $u_1=u_2=u_3=0$.

第一条保证分解存在. 若一个向量有两种分解, 将它们相减, 第二条就保证两种分解逐项相同, 即分解唯一. 反之, 分解唯一性也蕴含第二条.

可实际检验的等价条件为
$$
\boxed{
\begin{gathered}
U_1+U_2+U_3=V,\\
U_1\cap(U_2+U_3)=\{0\},\qquad U_2\cap U_3=\{0\}.
\end{gathered}}
$$
事实上, 若 $u_1+u_2+u_3=0$, 则 $u_1=-(u_2+u_3)$ 属于 $U_1\cap(U_2+U_3)$, 因而 $u_1=0$. 于是 $u_2=-u_3\in U_2\cap U_3$, 从而 $u_2=u_3=0$. 必要性则由直和分解的唯一性得到.

若 $V$ 有限维, 且已知 $U_1+U_2+U_3=V$, 则还可以用
$$
\dim U_1+\dim U_2+\dim U_3=\dim V
$$
作为充要条件. 将三个子空间的基依次排成一组向量, 总和为 $V$ 保证这组向量张成 $V$. 它们构成 $V$ 的一组基, 当且仅当向量总数等于 $\dim V$, 也当且仅当上述分解唯一.

**问题四** 设 $P$ 和 $Q$ 均为 $\mathbb R^n$ 上的正交投影矩阵, 用 $R(\cdot)$ 表示矩阵的列空间. 证明 $R(P + Q) = R(P) + R(Q)$.

**注记** 幂等矩阵指满足 $P^2 = P$ 的矩阵, 正交投影矩阵指满足 $P^2 = P = P^T$ 的矩阵 (复数情形取共轭转置). 不同文献中, "投影矩阵" 一词有时指幂等矩阵, 有时指正交投影矩阵.

**解答.** 由 $P=P^T=P^2$ 和 $Q=Q^T=Q^2$, 直接得到
$$
\begin{aligned}
R(P+Q)
&=R(PP^T+QQ^T)\\
&=R\bigl((P\mid Q)(P\mid Q)^T\bigr)\\
&=R(P\mid Q)\\
&=R(P)+R(Q).
\end{aligned}
$$
其中 $(P\mid Q)$ 表示将 $P,Q$ 按列拼接所得的矩阵. 第三个等号由问题二的结论得到, 取 $A=(P\mid Q)^T$ 即可.
