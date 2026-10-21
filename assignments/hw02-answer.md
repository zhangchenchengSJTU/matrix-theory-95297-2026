---
redhead: 矩阵理论课程作业
document-number: 研-MATH6005-M05-矩阵理论 〔2026〕 第 2 次作业参考答案
---

# 第二次作业参考答案

**问题一** 实对称矩阵与其主子矩阵的特征值之间有一种有趣的交错关系. 设
$$
A=\begin{pmatrix}
4&1&1\\
1&4&2\\
1&2&4
\end{pmatrix},\qquad
B=\begin{pmatrix}
4&1\\
1&4
\end{pmatrix},
$$
其中 $B$ 是 $A$ 的左上角二阶主子矩阵.

**(1)** 计算 $A$ 的顺序主子式, 证明 $A$ 正定. 求 $A$ 与 $B$ 的特征多项式及全部特征值.

**解答.** $A$ 的三个顺序主子式为
$$
\Delta_1=4,\qquad
\Delta_2=\begin{vmatrix}4&1\\1&4\end{vmatrix}=15,\qquad
\Delta_3=\det A=44.
$$
它们全为正. 由 Sylvester 判别法, $A$ 正定.

直接展开得到
$$
\begin{aligned}
\det(\lambda I-A)
&=\lambda^3-12\lambda^2+42\lambda-44\\
&=(\lambda-2)(\lambda^2-10\lambda+22),\\
\det(\lambda I-B)
&=(\lambda-4)^2-1=(\lambda-3)(\lambda-5).
\end{aligned}
$$
因此 $A$ 的特征值为
$$
2,\qquad 5-\sqrt3,\qquad 5+\sqrt3,
$$
而 $B$ 的特征值为 $3,5$.

**(2)** 将 $A$ 与 $B$ 的特征值分别按从小到大排列为 $\lambda_1\le\lambda_2\le\lambda_3$ 和 $\mu_1\le\mu_2$. 将这五个数标在同一条数轴上, 比较大小, 写出它们的交错排列关系.

**解答.** 因为 $1<\sqrt3<2$, 有
$$
2<3<5-\sqrt3<5<5+\sqrt3.
$$
故
$$
\lambda_1=2,\qquad \lambda_2=5-\sqrt3,\qquad \lambda_3=5+\sqrt3,
$$
以及
$$
\mu_1=3,\qquad \mu_2=5.
$$
在数轴上, 五个数依次为
$$
\boxed{\lambda_1<\mu_1<\lambda_2<\mu_2<\lambda_3.}
$$
这正是本题中的 Cauchy 特征值交错关系.

**(3)** 对任意 $y=\left(\begin{smallmatrix}y_1\\y_2\end{smallmatrix}\right)\in\mathbb R^2$, 令 $x=\left(\begin{smallmatrix}y_1\\y_2\\0\end{smallmatrix}\right)$. 验证 $y^TBy=x^TAx$, 并利用二次型在单位向量上的最大值和最小值, 证明
$$
\lambda_1\le\mu_1,\qquad \mu_2\le\lambda_3.
$$
说明为什么把二次型限制在一个坐标子空间上, 最小值不会变小, 最大值不会变大.

**解答.** 代入 $x=\left(\begin{smallmatrix}y_1\\y_2\\0\end{smallmatrix}\right)$, 有
$$
x^TAx
=4y_1^2+2y_1y_2+4y_2^2
=y^TBy.
$$
当 $\|y\|=1$ 时, 相应的 $x$ 也满足 $\|x\|=1$. 反过来, 这样的 $x$ 恰好是三维单位球面中第三个坐标为 $0$ 的向量. 因而
$$
\begin{aligned}
\mu_1
&=\min_{\|y\|=1}y^TBy
=\min_{\substack{\|x\|=1\\x_3=0}}x^TAx
\ge \min_{\|x\|=1}x^TAx
=\lambda_1,\\
\mu_2
&=\max_{\|y\|=1}y^TBy
=\max_{\substack{\|x\|=1\\x_3=0}}x^TAx
\le \max_{\|x\|=1}x^TAx
=\lambda_3.
\end{aligned}
$$
限制后的单位向量集合是原单位向量集合的子集. 因此在较小的集合上取最小值时, 不能得到更小的数; 在较小的集合上取最大值时, 不能得到更大的数. 这就说明了两端不等式.

**问题二** 设 $n\ge2$. 一条一维弹簧链有 $n$ 个可移动节点, 两端固定. 固定端的位移为 $x_0=x_{n+1}=0$, 且节点 $i$ 的平衡方程为
$$
2x_i-x_{i-1}-x_{i+1}=b_i,\qquad i=1,\ldots,n.
$$
因此需解 $A_nx=b$, 其中
$$
A_n=\begin{pmatrix}
2&-1&&\\
-1&2&\ddots&\\
&\ddots&\ddots&-1\\
&&-1&2
\end{pmatrix}_{n\times n}.
$$

**(1)** 证明对任意 $x=\left(\begin{smallmatrix}x_1\\\vdots\\x_n\end{smallmatrix}\right)$, 有
$$
x^TA_nx=x_1^2+\sum_{i=1}^{n-1}(x_{i+1}-x_i)^2+x_n^2.
$$
由此说明 $A_n$ 正定.

**解答.** 展开右边可得
$$
\begin{aligned}
x_1^2+\sum_{i=1}^{n-1}(x_{i+1}-x_i)^2+x_n^2
&=2\sum_{i=1}^n x_i^2-2\sum_{i=1}^{n-1}x_ix_{i+1}\\
&=x^TA_nx.
\end{aligned}
$$
右边是若干平方和. 若它等于 $0$, 则首先 $x_1=0$; 又每个 $x_{i+1}-x_i=0$, 故依次有 $x_2=\cdots=x_n=0$. 所以对任意 $x\ne0$, 都有 $x^TA_nx>0$, 即 $A_n$ 正定.

**(2)** 求 $A_n$ 的 Cholesky 分解 $A_n=L_nL_n^T$, 写出 $L_n$ 的对角元和次对角元的一般规律, 并验证所得分解.

**解答.** 取下双对角矩阵
$$
L_n=\begin{pmatrix}
\sqrt2&&&&\\
-\sqrt{\frac12}&\sqrt{\frac32}&&&\\
&-\sqrt{\frac23}&\sqrt{\frac43}&&\\
&&\ddots&\ddots&\\
&&&-\sqrt{\frac{n-1}{n}}&\sqrt{\frac{n+1}{n}}
\end{pmatrix}.
$$
也就是说, 对 $i=1,\ldots,n$,
$$
(L_n)_{ii}=\sqrt{\frac{i+1}{i}},
$$
并且对 $i=2,\ldots,n$,
$$
(L_n)_{i,i-1}=-\sqrt{\frac{i-1}{i}},
$$
其余元素为 $0$.

这个规律可由 Cholesky 分解的逐行计算得到. 第一行给出 $l_{11}=\sqrt2$. 若已经算出
$l_{i-1,i-1}=\sqrt{i/(i-1)}$, 则次对角元满足
$$
l_{i,i-1}l_{i-1,i-1}=-1,
$$
从而 $l_{i,i-1}=-\sqrt{(i-1)/i}$. 再由第 $i$ 个对角元满足
$$
l_{i,i-1}^2+l_{ii}^2=2,
$$
得到 $l_{ii}=\sqrt{(i+1)/i}$.

最后验证: $L_nL_n^T$ 的第一个对角元为 $2$; 对 $i\ge2$, 第 $i$ 个对角元为
$$
\frac{i-1}{i}+\frac{i+1}{i}=2.
$$
相邻的非对角元为
$$
(L_nL_n^T)_{i,i-1}
=-\sqrt{\frac{i-1}{i}}\sqrt{\frac{i}{i-1}}=-1.
$$
其余非对角元为 $0$. 因而 $L_nL_n^T=A_n$.

**(3)** 取 $n=4$, 且只有第二个节点受到单位外力, 即 $b=\left(\begin{smallmatrix}0\\1\\0\\0\end{smallmatrix}\right)$. 利用 Cholesky 分解, 先解 $L_4y=b$, 再解 $L_4^Tx=y$, 求出各节点的位移 $x$.

**解答.** 由第 (2) 问,
$$
L_4=
\begin{pmatrix}
\sqrt2&0&0&0\\
-\frac{\sqrt2}{2}&\frac{\sqrt6}{2}&0&0\\
0&-\frac{\sqrt6}{3}&\frac{2\sqrt3}{3}&0\\
0&0&-\frac{\sqrt3}{2}&\frac{\sqrt5}{2}
\end{pmatrix}.
$$
前代 $L_4y=b$ 给出
$$
y=
\left(\begin{smallmatrix}
0\\ \sqrt6/3\\ \sqrt3/3\\ \sqrt5/5
\end{smallmatrix}\right).
$$
再对 $L_4^Tx=y$ 作回代, 得
$$
x=
\left(\begin{smallmatrix}
3/5\\ 6/5\\ 4/5\\ 2/5
\end{smallmatrix}\right).
$$
因此第二个节点位移最大; 其余节点的位移沿弹簧链向两端递减.

**(4)** 将第 (3) 问推广到一般 $n$: 若只有第 $k$ 个节点受到单位外力 ($b=e_k$), 证明解满足
$$
x_i=\frac{\min(i,k)\bigl(n+1-\max(i,k)\bigr)}{n+1},\qquad i=1,\ldots,n.
$$

**解答.** 由第 (1) 问, $A_n$ 正定, 因而可逆. 所以方程 $A_nx=e_k$ 有且仅有一个解. 因此, 只要将题目给出的公式代入并验证它满足方程, 就已证明它是所求的解. 这里的验算就是一种完整的证明. 下面先验算, 再说明不知道公式时怎样求解.

**一、验算给定公式.** 令 $N=n+1$. 题中的公式可分成两段写为
$$
x_i=
\begin{cases}
\displaystyle\frac{i(N-k)}{N},&i\le k,\\[4pt]
\displaystyle\frac{k(N-i)}{N},&i\ge k.
\end{cases}
$$
将这两段延伸到固定端, 得到边界值 $x_0=x_N=0$. 当 $i<k$ 或 $i>k$ 时, 对应的一段是关于 $i$ 的一次函数, 相邻两项之差保持不变, 所以
$$
2x_i-x_{i-1}-x_{i+1}=0.
$$
在受力节点 $i=k$ 处, 左侧相邻位移差为 $(N-k)/N$, 右侧相邻位移差为 $-k/N$. 因而
$$
\begin{aligned}
2x_k-x_{k-1}-x_{k+1}
&=(x_k-x_{k-1})-(x_{k+1}-x_k)\\
&=\frac{N-k}{N}-\left(-\frac{k}{N}\right)=1.
\end{aligned}
$$
故所有节点都满足平衡方程, 即 $A_nx=e_k$. 由解的唯一性, 题中公式就是所求位移.

**二、从未知位移出发求解.** 现在不预先使用题中的公式. 仍令 $N=n+1$, 并记相邻节点的位移差为
$$
d_i=x_i-x_{i-1},\qquad i=1,\ldots,N.
$$
由于只有第 $k$ 个节点受到单位外力, 平衡方程等价于
$$
d_i-d_{i+1}=
\begin{cases}
1,&i=k,\\
0,&i\ne k.
\end{cases}
$$
当 $i\ne k$ 时, 有 $d_i=d_{i+1}$. 所以受力点左侧的位移差全部相等, 右侧的位移差也全部相等. 设
$$
d_1=\cdots=d_k=p,\qquad
d_{k+1}=\cdots=d_N=q.
$$
第 $k$ 个节点的平衡方程给出
$$
p-q=1.
$$
另一方面, 两端固定, 故所有位移差的和为
$$
\sum_{i=1}^{N}d_i=x_N-x_0=0.
$$
左侧有 $k$ 项等于 $p$, 右侧有 $N-k$ 项等于 $q$, 因而
$$
kp+(N-k)q=0.
$$
联立这两个一次方程, 求得
$$
p=\frac{N-k}{N},\qquad q=-\frac{k}{N}.
$$
最后从 $x_0=0$ 开始累加位移差. 当 $i\le k$ 时,
$$
x_i=\sum_{j=1}^{i}d_j=ip=\frac{i(N-k)}{N}.
$$
当 $i\ge k$ 时,
$$
\begin{aligned}
x_i&=kp+(i-k)q\\
&=\frac{k(N-k)-(i-k)k}{N}\\
&=\frac{k(N-i)}{N}.
\end{aligned}
$$
把两段合并, 再代回 $N=n+1$, 就得到
$$
\boxed{x_i=\frac{\min(i,k)\bigl(n+1-\max(i,k)\bigr)}{n+1}.}
$$
这个求解过程也解释了位移图像的形状: 两端位移为零, 受力点两侧各是一段直线, 位移差在受力点处改变 $1$.
