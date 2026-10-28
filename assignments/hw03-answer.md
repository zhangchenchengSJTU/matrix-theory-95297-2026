---
redhead: 矩阵理论课程作业
document-number: 研-MATH6005-M05-矩阵理论 〔2026〕 第 3 次作业参考答案
---

# 第三次作业参考答案

**问题一** 用 Schmidt 正交化的思路, 分别求矩阵
$$
A=\begin{pmatrix}
1&2&1\\
2&3&2\\
2&2&1
\end{pmatrix}
$$
的 QR 分解和 TP 分解. 以下各三角因子的对角元均要求为正.

**(1)** 对 $A$ 的列向量从左到右作 Schmidt 正交化并单位化, 求 $A=QR$, 其中 $Q$ 为正交矩阵, $R$ 为上三角矩阵. 写出正交化过程, 并验证所得分解.

**解答.** 记 $A$ 的三列为 $a_1,a_2,a_3$. 先取
$$
u_1=a_1=\left(\begin{smallmatrix}1\\2\\2\end{smallmatrix}\right),
\qquad \|u_1\|=3,
\qquad q_1=\frac{u_1}{\|u_1\|}
=\frac13\left(\begin{smallmatrix}1\\2\\2\end{smallmatrix}\right).
$$
第二列在 $q_1$ 方向的系数为 $q_1^Ta_2=4$. 去掉这一分量, 得
$$
u_2=a_2-4q_1
=\frac13\left(\begin{smallmatrix}2\\1\\-2\end{smallmatrix}\right),
\qquad \|u_2\|=1,
\qquad q_2=u_2.
$$
再计算
$$
q_1^Ta_3=7/3,\qquad q_2^Ta_3=2/3.
$$
所以
$$
u_3=a_3-\frac73q_1-\frac23q_2
=\frac19\left(\begin{smallmatrix}-2\\2\\-1\end{smallmatrix}\right),
\qquad \|u_3\|=1/3,
$$
从而
$$
q_3=\frac{u_3}{\|u_3\|}
=\frac13\left(\begin{smallmatrix}-2\\2\\-1\end{smallmatrix}\right).
$$
三个原列向量分别写为
$$
\begin{aligned}
a_1&=3q_1,\\
a_2&=4q_1+q_2,\\
a_3&=\frac73q_1+\frac23q_2+\frac13q_3.
\end{aligned}
$$
因此
$$
\boxed{
Q=\frac13\begin{pmatrix}
1&2&-2\\
2&1&2\\
2&-2&-1
\end{pmatrix},\qquad
R=\begin{pmatrix}
3&4&7/3\\
0&1&2/3\\
0&0&1/3
\end{pmatrix}.}
$$
验证时, $q_i^Tq_j=0$ ($i\ne j$), 且 $\|q_i\|=1$, 所以 $Q^TQ=I$. 同时
$$
QR=\frac13\begin{pmatrix}
3&6&3\\
6&9&6\\
6&6&3
\end{pmatrix}=A.
$$
$R$ 的对角元 $3,1,1/3$ 均为正.

**(2)** 对 $A$ 的行向量作 Schmidt 正交化并单位化, 求 $A=TP$, 其中 $T$ 为上三角矩阵, $P$ 为正交矩阵. 为使 $T$ 是上三角矩阵, 应按怎样的次序处理各行? 写出正交化过程, 并验证所得分解.

**解答.** 记 $A$ 的三行为 $b_1,b_2,b_3$. **按第三行、第二行、第一行的次序, 自下而上进行正交化.** 这样每个 $b_i$ 都由 $p_i,p_{i+1},\ldots,p_3$ 线性表示, 对应的左因子才是上三角矩阵.

首先
$$
v_3=b_3=(2,2,1),\qquad
\|v_3\|=3,\qquad p_3=\frac13(2,2,1).
$$
第二行在 $p_3$ 方向的系数为 $b_2p_3^T=4$, 故
$$
v_2=b_2-4p_3=\frac13(-2,1,2),
\qquad\|v_2\|=1,\qquad p_2=v_2.
$$
对第一行, 有
$$
b_1p_3^T=7/3,\qquad b_1p_2^T=2/3.
$$
于是
$$
v_1=b_1-\frac73p_3-\frac23p_2
=\frac19(-1,2,-2),\qquad \|v_1\|=1/3,
$$
从而 $p_1=(-1,2,-2)/3$. 将三行按原来的顺序排列, 有
$$
\begin{aligned}
b_1&=\frac13p_1+\frac23p_2+\frac73p_3,\\
b_2&=p_2+4p_3,\\
b_3&=3p_3.
\end{aligned}
$$
因此
$$
\boxed{
T=\begin{pmatrix}
1/3&2/3&7/3\\
0&1&4\\
0&0&3
\end{pmatrix},\qquad
P=\frac13\begin{pmatrix}
-1&2&-2\\
-2&1&2\\
2&2&1
\end{pmatrix}.}
$$
三行 $p_1,p_2,p_3$ 两两正交且长度为 $1$, 所以 $PP^T=I$. 直接相乘得到
$$
TP=\frac13\begin{pmatrix}
3&6&3\\
6&9&6\\
6&6&3
\end{pmatrix}=A.
$$
$T$ 的对角元 $1/3,1,3$ 均为正.

从基变换的角度看, $A=QR$ 表示 $A$ 的每一列在标准正交列基 $Q$ 下的坐标由 $R$ 给出, 而 $Q=AR^{-1}$ 表示通过列变换把原列基正交化. 类似地, $A=TP$ 的行坐标由 $T$ 给出, $P=T^{-1}A$ 则表示通过行变换把原行基正交化.

**问题二** 设 $V$ 为实系数、次数不超过 $2$ 的多项式构成的线性空间. 定义映射
$$
\Phi:V\times V\longrightarrow\mathbb R,
$$
$$
\Phi(f,g)=\int_{-3}^{3}\int_{(y-1)/2}^{(y+1)/2}
f(x)g(y-x)\,dx\,dy.
$$

**(1)** 证明 $\Phi$ 是 $V$ 上的内积, 从而 $V$ 在该内积下成为内积空间.

**解答.** 积分对被积函数是线性的, 因此 $\Phi$ 对两个变量分别线性. 下面验证对称性和正定性.

固定 $y$, 令 $u=y-x$. 当 $x$ 从 $(y-1)/2$ 增至 $(y+1)/2$ 时, $u$ 从 $(y+1)/2$ 减至 $(y-1)/2$. 换元并调换积分上下限, 得
$$
\begin{aligned}
&\int_{(y-1)/2}^{(y+1)/2}f(x)g(y-x)\,dx\\
&\qquad=\int_{(y-1)/2}^{(y+1)/2}g(u)f(y-u)\,du.
\end{aligned}
$$
再对 $y$ 积分即得 $\Phi(f,g)=\Phi(g,f)$.

为验证正定性, 只需判断在基 $(1,x,x^2)$ 下的 Gram 矩阵是否正定. 计算得
$$
G=\begin{pmatrix}
6&0&5\\
0&4&0\\
5&0&27/5
\end{pmatrix}.
$$
下面说明这些矩阵元素的计算. 令
$$
t=x-y/2,\qquad -1/2\le t\le1/2.
$$
此时 $x=y/2+t$, $y-x=y/2-t$, 内层积分变为在 $[-1/2,1/2]$ 上对 $t$ 积分. 由奇函数在对称区间上的积分为零,
$$
\Phi(1,x)=\Phi(x,x^2)=0,\qquad \Phi(1,1)=6.
$$
其余三个积分为
$$
\begin{aligned}
\Phi(1,x^2)
&=\int_{-3}^{3}\left(\frac{y^2}{4}+\frac1{12}\right)\,dy=5,\\
\Phi(x,x)
&=\int_{-3}^{3}\left(\frac{y^2}{4}-\frac1{12}\right)\,dy=4,\\
\Phi(x^2,x^2)
&=\int_{-3}^{3}\left(\frac{y^4}{16}-\frac{y^2}{24}+\frac1{80}\right)\,dy
=\frac{27}{5}.
\end{aligned}
$$
例如最后一式使用了
$$
\left(\frac y2+t\right)^2\left(\frac y2-t\right)^2
=\frac{y^4}{16}-\frac{y^2t^2}{2}+t^4.
$$
矩阵 $G$ 的三个顺序主子式为
$$
\begin{aligned}
\Delta_1&=6,\qquad
\Delta_2=\begin{vmatrix}6&0\\0&4\end{vmatrix}=24,\\
\Delta_3&=\det G=4\left(6\cdot\frac{27}{5}-25\right)=\frac{148}{5}.
\end{aligned}
$$
它们均为正, 故由 Sylvester 判别法, $G$ 是正定矩阵. 对任意 $f(x)=a+bx+cx^2$, 记其系数向量为
$z=\left(\begin{smallmatrix}a\\b\\c\end{smallmatrix}\right)$, 则
$$
\Phi(f,f)=z^TGz.
$$
当 $f\ne0$ 时, $z\ne0$, 所以 $\Phi(f,f)>0$. 结合前面的双线性和对称性, $\Phi$ 是 $V$ 上的内积.

**(2)** 在上述内积下, 对基 $(1,x,x^2)$ 作 Schmidt 正交化并单位化, 得到标准正交基 $(e_1,e_2,e_3)$. 求对角元为正的上三角矩阵 $R$, 使得
$$
(1,x,x^2)R=(e_1,e_2,e_3).
$$

**解答.** 第一个多项式的平方范数是 $\Phi(1,1)=6$, 因此
$$
e_1=1/\sqrt6.
$$
因为 $\Phi(x,1)=0$, 第二个多项式已经与第一个正交; 又 $\Phi(x,x)=4$, 故
$$
e_2=x/2.
$$
对第三个多项式, 有
$$
\Phi(x^2,e_1)=5/\sqrt6,\qquad
\Phi(x^2,e_2)=0.
$$
去掉已有的两个正交方向, 得
$$
u_3=x^2-\Phi(x^2,e_1)e_1-\Phi(x^2,e_2)e_2
=x^2-5/6.
$$
它的平方范数为
$$
\begin{aligned}
\Phi(u_3,u_3)
&=\frac{27}{5}-2\cdot\frac56\cdot5+\frac{25}{36}\cdot6\\
&=\frac{37}{30}.
\end{aligned}
$$
所以
$$
e_3=\sqrt{\frac{30}{37}}\left(x^2-\frac56\right).
$$
把每个 $e_j$ 在原基 $(1,x,x^2)$ 中的系数放在第 $j$ 列, 得
$$
\boxed{
R=\begin{pmatrix}
1/\sqrt6&0&-\dfrac56\sqrt{\dfrac{30}{37}}\\
0&1/2&0\\
0&0&\sqrt{\dfrac{30}{37}}
\end{pmatrix}.}
$$
直接计算可得
$$
\begin{aligned}
(1,x,x^2)R
&=\left(1/\sqrt6,\ x/2,\ \sqrt{30/37}\,(x^2-5/6)\right)\\
&=(e_1,e_2,e_3).
\end{aligned}
$$
$R$ 的对角元均为正, 而且 $R^TGR=I$, 即所得三项两两正交、平方范数均为 $1$.
