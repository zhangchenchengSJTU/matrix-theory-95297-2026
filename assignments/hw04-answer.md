---
redhead: 矩阵理论课程作业
document-number: 研-MATH6005-M05-矩阵理论 〔2026〕 第 4 次作业参考答案
issuer: 研-MATH6005-M05-矩阵理论
printer: 助教: 张陈成
publication-date: 2026年11月4日
print-date: 2026年11月4日
---

# 第四次作业参考答案

**问题一** 放大器响应的两种表示.

设一个放大器的输入为 $u$, 输出为 $F(u)$. 把输入稍微放大, 与把原输出按相同比例放大, 效果可能不同. 对这两种操作作一阶近似, 相应的变化系数分别为 $uF'(u)$ 和 $F(u)$. 因此, 可以用 $uF'(u)-F(u)$ 比较两者的差别.

现在输入正弦信号 $u=\sin x$, 将输出记为 $f(x)=F(\sin x)$. 由链式法则, $f'(x)=F'(\sin x)\cos x$, 所以原来用输入变量 $u$ 写出的量, 改用 $x$ 表示就是
$$
uF'(u)-F(u)=\frac{\sin x}{\cos x}f'(x)-f(x)
=\tan x\,f'(x)-f(x).
$$
在下面的有限维模型中, 用 $\sin x$ 的幂描述放大器的响应较方便, 用不同频率的正弦函数则能看出输出中有哪些谐波. 本题通过换基联系这两种表示.

以下函数均定义在区间 $I=(-\pi/2,\pi/2)$ 上, 因而 $\cos x\ne0$. 记
$$
\begin{aligned}
\mathcal A&=(\sin x,\sin3x,\sin5x,\sin7x),\\
\mathcal B&=(\sin x,\sin^3x,\sin^5x,\sin^7x).
\end{aligned}
$$
设 $V=\operatorname{span}\mathcal A$, 考虑变换
$$
(Tf)(x)=\tan x\,f'(x)-f(x).
$$


**(1)** 证明 $\mathcal A,\mathcal B$ 都是 $V$ 的基, 并求过渡矩阵 $P$, 使得 $\mathcal B=\mathcal A P$.

**解答.** 先用多角公式把正弦的幂写成谐波的线性组合:
$$
\begin{aligned}
\sin^3x&=\frac{3\sin x-\sin3x}{4},\\
\sin^5x&=\frac{10\sin x-5\sin3x+\sin5x}{16},\\
\sin^7x&=\frac{35\sin x-21\sin3x+7\sin5x-\sin7x}{64}.
\end{aligned}
$$
所以 $\mathcal B$ 中的四个函数都属于 $V$.

下面证明它们线性无关. 若
$$
c_1\sin x+c_3\sin^3x+c_5\sin^5x+c_7\sin^7x=0
\qquad(x\in I),
$$
令 $u=\sin x$. 当 $x$ 遍历 $I$ 时, $u$ 遍历 $(-1,1)$, 因而
$$
c_1u+c_3u^3+c_5u^5+c_7u^7=0
\qquad(-1<u<1).
$$
一个多项式在整个区间上为零, 各项系数只能全部为零. 因此 $\mathcal B$ 线性无关.

由 $V$ 的定义, $\dim V\leq4$; 又因为 $V$ 中已有四个线性无关的函数, 所以 $\dim V=4$. 因此 $\mathcal A,\mathcal B$ 都是 $V$ 的基.

把上面三个多角公式的系数按列排列, 得到
$$
\boxed{
P=\begin{pmatrix}
1&3/4&5/8&35/64\\
0&-1/4&-5/16&-21/64\\
0&0&1/16&7/64\\
0&0&0&-1/64
\end{pmatrix}.}
$$
这里第 $j$ 列是 $\mathcal B$ 的第 $j$ 个函数在基 $\mathcal A$ 下的坐标, 所以 $\mathcal B=\mathcal A P$.

**(2)** 证明 $T$ 是 $V$ 到自身的线性变换, 并求 $T$ 在基 $\mathcal B$ 下的矩阵 $M_{\mathcal B}$, 即, $T\mathcal B=\mathcal B M_{\mathcal B}$.

**解答.** 对 $k=1,3,5,7$, 有
$$
\begin{aligned}
T(\sin^kx)
&=\tan x\cdot k\sin^{k-1}x\cos x-\sin^kx\\
&=(k-1)\sin^kx.
\end{aligned}
$$
因此
$$
\begin{aligned}
T(\sin x)&=0,\\
T(\sin^3x)&=2\sin^3x,\\
T(\sin^5x)&=4\sin^5x,\\
T(\sin^7x)&=6\sin^7x.
\end{aligned}
$$
基函数的像都在 $V$ 中, 所以 $T(V)\subseteq V$. 又因为求导和函数的数乘、加减都是线性的,
$$
T(af+bg)=aTf+bTg
\qquad(f,g\in V,\ a,b\in\mathbb R).
$$
故 $T$ 是 $V$ 到自身的线性变换, 且
$$
\boxed{
M_{\mathcal B}=\begin{pmatrix}
0&0&0&0\\
0&2&0&0\\
0&0&4&0\\
0&0&0&6
\end{pmatrix}.}
$$

**(3)** 利用基变换求 $T$ 在基 $\mathcal A$ 下的矩阵 $M_{\mathcal A}$, 写出 $M_{\mathcal A},M_{\mathcal B},P$ 之间的关系.

**解答.** 由 $\mathcal B=\mathcal A P$, 对两边逐个施加 $T$, 得
$$
T\mathcal B=T(\mathcal A P)=(T\mathcal A)P
=\mathcal A M_{\mathcal A}P.
$$
另一方面,
$$
T\mathcal B=\mathcal B M_{\mathcal B}
=\mathcal A P M_{\mathcal B}.
$$
因为 $\mathcal A$ 是一组基, 对应坐标相同, 所以
$$
M_{\mathcal A}P=PM_{\mathcal B},
\qquad
\boxed{M_{\mathcal A}=PM_{\mathcal B}P^{-1}.}
$$
由第 (1) 问的 $P$ 可得
$$
P^{-1}=\begin{pmatrix}
1&3&5&7\\
0&-4&-20&-56\\
0&0&16&112\\
0&0&0&-64
\end{pmatrix}.
$$
相乘得到
$$
\boxed{
M_{\mathcal A}=\begin{pmatrix}
0&-6&10&-14\\
0&2&-10&14\\
0&0&4&-14\\
0&0&0&6
\end{pmatrix}.}
$$
例如第二列表示 $T(\sin3x)=-6\sin x+2\sin3x$.

这个相似关系表达的是同一个 $T$ 在两组基下的矩阵表示. 基 $\mathcal B$ 使计算变得简单, 再通过 $P$ 换回谐波基 $\mathcal A$.

**(4)** 求 $\operatorname{Im}T$ 和 $\operatorname{Ker}T$ 的各一组基及维数.

**注记** 同一个线性变换, 用不同的基来描述, 会得到不同的矩阵. 这里输入和输出都在 $V$ 中, 要按同一个过渡矩阵换坐标, 因而两种矩阵表示满足相似关系. 所以可以先在一组容易计算的基下求矩阵, 再换回原来的基.

**解答.** 在基 $\mathcal B$ 下, 任意 $f\in V$ 可写为
$$
f=c_1\sin x+c_3\sin^3x+c_5\sin^5x+c_7\sin^7x,
$$
于是
$$
Tf=2c_3\sin^3x+4c_5\sin^5x+6c_7\sin^7x.
$$
因此
$$
\boxed{
\operatorname{Ker}T=\operatorname{span}\{\sin x\},
\qquad \dim\operatorname{Ker}T=1,}
$$
$$
\boxed{
\operatorname{Im}T
=\operatorname{span}\{\sin^3x,\sin^5x,\sin^7x\},
\qquad \dim\operatorname{Im}T=3.}
$$
所以核空间的一组基为 $(\sin x)$, 像空间的一组基为 $(\sin^3x,\sin^5x,\sin^7x)$.

**问题二** 神经网络的参数调整与核矩阵.

神经网络通过调整参数来改变预测结果. 给定若干输入及其期望输出, 训练的目的就是让这些输入处的预测值尽量接近期望值. 当参数只作微小调整时, 可以用一阶近似描述预测值的变化: 对每个固定的输入, 预测值的变化近似为各个参数调整量的线性组合.

在下面的六参数简化模型中, 记参数调整量为 $h=\left(\begin{smallmatrix}h_1\\h_2\\h_3\\h_4\\h_5\\h_6\end{smallmatrix}\right)\in\mathbb R^6$, 假设输入 $x$ 处的预测变化的一阶近似为
$$
p_h(x)=(h_4+2h_6)+2(h_3+h_5)x+(h_1+2h_2)x^2.
$$
这条曲线描述同一次参数调整对不同输入的影响. 现在只考察四个训练输入 $x_1=-1,x_2=0,x_3=1,x_4=2$, 将它们的预测变化放在一起, 得到映射
$$
T:\mathbb R^6\longrightarrow\mathbb R^4,
\qquad
Th=\left(\begin{smallmatrix}
p_h(-1)\\p_h(0)\\p_h(1)\\p_h(2)
\end{smallmatrix}\right).
$$

将 $p_h(x)$ 中 $h_1,\ldots,h_6$ 的系数依次排成列向量, 得到
$$
\phi(x)=\left(\begin{smallmatrix}x^2\\2x^2\\2x\\1\\2x\\2\end{smallmatrix}\right),
\qquad p_h(x)=\phi(x)\cdot h.
$$
具体地, 在四个训练输入处, 这四个向量分别为
$$
\begin{aligned}
\phi(x_1)&=\left(\begin{smallmatrix}1\\2\\-2\\1\\-2\\2\end{smallmatrix}\right),&
\phi(x_2)&=\left(\begin{smallmatrix}0\\0\\0\\1\\0\\2\end{smallmatrix}\right),\\
\phi(x_3)&=\left(\begin{smallmatrix}1\\2\\2\\1\\2\\2\end{smallmatrix}\right),&
\phi(x_4)&=\left(\begin{smallmatrix}4\\8\\4\\1\\4\\2\end{smallmatrix}\right).
\end{aligned}
$$
定义核函数与核矩阵
$$
k(x,s)=\phi(x)\cdot\phi(s),\qquad
K=(k(x_i,x_j))_{4\times4}.
$$
我们可以尝试用四个训练输入对应的向量来组合参数调整: 对 $\alpha\in\mathbb R^4$, 令 $h=\sum_{j=1}^4\alpha_j\phi(x_j)$, 则四个输入处的预测变化组成的向量为 $Th=K\alpha$.

**(1)** 自行验证 $T$ 是线性映射 (无需作答), 并求它在标准基下的矩阵 $J$.

**解答.** 将四个输入分别代入, 得
$$
\begin{aligned}
p_h(-1)&=h_1+2h_2-2h_3+h_4-2h_5+2h_6,\\
p_h(0)&=h_4+2h_6,\\
p_h(1)&=h_1+2h_2+2h_3+h_4+2h_5+2h_6,\\
p_h(2)&=4h_1+8h_2+4h_3+h_4+4h_5+2h_6.
\end{aligned}
$$
依次取出各式中 $h_1,\ldots,h_6$ 的系数, 得 $Th=Jh$, 其中
$$
\boxed{
J=\begin{pmatrix}
1&2&-2&1&-2&2\\
0&0&0&1&0&2\\
1&2&2&1&2&2\\
4&8&4&1&4&2
\end{pmatrix}.}
$$

**(2)** 求 $\operatorname{Im}T$ 和 $\operatorname{Ker}T$ 的各一组基及维数. 判断方程 $Th=y$ 和 $Th=z$ 是否有解, 其中
$$
y=\left(\begin{smallmatrix}1\\0\\1\\4\end{smallmatrix}\right),
\qquad
z=\left(\begin{smallmatrix}0\\0\\0\\1\end{smallmatrix}\right).
$$

**解答.** 记常数函数 $1$、一次函数 $x$ 和二次函数 $x^2$ 在四个输入处的取值向量分别为
$$
u_0=\left(\begin{smallmatrix}1\\1\\1\\1\end{smallmatrix}\right),\qquad
u_1=\left(\begin{smallmatrix}-1\\0\\1\\2\end{smallmatrix}\right),\qquad
u_2=\left(\begin{smallmatrix}1\\0\\1\\4\end{smallmatrix}\right).
$$
由 $p_h$ 的表达式,
$$
Th=(h_4+2h_6)u_0+2(h_3+h_5)u_1+(h_1+2h_2)u_2.
$$
这三个系数可以独立取任意实数, 所以
$$
\operatorname{Im}T=\operatorname{span}\{u_0,u_1,u_2\}.
$$
若 $c_0u_0+c_1u_1+c_2u_2=0$, 则多项式 $c_0+c_1x+c_2x^2$ 在 $-1,0,1,2$ 四个不同的点为零, 因而只能是零多项式. 所以 $u_0,u_1,u_2$ 线性无关, 它们构成像空间的一组基, 且
$$
\boxed{\dim\operatorname{Im}T=3.}
$$
同理, $Th=0$ 当且仅当 $p_h$ 是零多项式, 即
$$
h_1+2h_2=0,\qquad h_3+h_5=0,\qquad h_4+2h_6=0.
$$
分别令 $h_2,h_5,h_6$ 为自由参数, 得到核空间的一组基
$$
v_1=\left(\begin{smallmatrix}-2\\1\\0\\0\\0\\0\end{smallmatrix}\right),\qquad
v_2=\left(\begin{smallmatrix}0\\0\\-1\\0\\1\\0\end{smallmatrix}\right),\qquad
v_3=\left(\begin{smallmatrix}0\\0\\0\\-2\\0\\1\end{smallmatrix}\right).
$$
因此
$$
\boxed{\operatorname{Ker}T=\operatorname{span}\{v_1,v_2,v_3\},\qquad
\dim\operatorname{Ker}T=3.}
$$
对于 $y$, 因为 $y=u_2$, 所以 $Th=y$ 有解. 例如取
$$
h=\left(\begin{smallmatrix}1\\0\\0\\0\\0\\0\end{smallmatrix}\right),
$$
就有 $p_h(x)=x^2$, 从而 $Th=y$.

对于 $z$, 若 $Th=z$, 则 $p_h(-1)=p_h(0)=p_h(1)=0$, 而 $p_h(2)=1$. 但次数不超过 $2$ 的多项式若在三个不同的点为零, 就只能恒为零, 不能在 $2$ 处取值 $1$. 因此 $Th=z$ 无解.

**(3)** 求核函数 $k(x,s)$ 及核矩阵 $K$, 并证明 $K=JJ^T$ 和 $\operatorname{Im}K=\operatorname{Im}T$.

**解答.** 由题干给出的 $\phi(x)$, 两个输入对应的向量相乘, 得
$$
\begin{aligned}
k(x,s)&=\phi(x)\cdot\phi(s)\\
&=x^2s^2+4x^2s^2+4xs+1+4xs+4\\
&=5x^2s^2+8xs+5.
\end{aligned}
$$
按 $-1,0,1,2$ 的顺序两两代入, 得到
$$
\boxed{
K=\begin{pmatrix}
18&5&2&9\\
5&5&5&5\\
2&5&18&41\\
9&5&41&117
\end{pmatrix}.}
$$
$J$ 的第 $i$ 行正是 $\phi(x_i)^T$, 因而 $JJ^T$ 的第 $(i,j)$ 个元素为
$$
(JJ^T)_{ij}=\phi(x_i)\cdot\phi(x_j)=K_{ij}.
$$
所以 $K=JJ^T$. 题目中的参数组合也就可以写成
$$
h=\sum_{j=1}^4\alpha_j\phi(x_j)=J^T\alpha,
\qquad Th=JJ^T\alpha=K\alpha.
$$
下面证明两个像空间相等. 由 $K\alpha=J(J^T\alpha)$, 先有
$$
\operatorname{Im}K\subseteq\operatorname{Im}J=\operatorname{Im}T.
$$
再比较维数. 对任意 $w\in\mathbb R^4$, 若 $J^Tw=0$, 则 $Kw=JJ^Tw=0$. 反过来, 若 $Kw=0$, 则
$$
0=w^TKw=w^TJJ^Tw=\|J^Tw\|^2,
$$
从而 $J^Tw=0$. 因此 $\operatorname{Ker}K=\operatorname{Ker}J^T$, 由秩与零度的关系得
$$
\operatorname{rank}K=\operatorname{rank}J^T
=\operatorname{rank}J=3.
$$
两个像空间有包含关系, 且维数相同, 所以
$$
\boxed{\operatorname{Im}K=\operatorname{Im}T.}
$$
所以, $Jh=y$ 有解时, 也可以先求 $K\alpha=y$, 再取 $h=J^T\alpha$.

**(4)** 求方程 $K\alpha=y$ 的一组解, 并计算 $h_*=J^T\alpha$. 证明: 对任意解 $\alpha$, 得到的 $h_*$ 都相同, 且它是 $Th=y$ 的所有解中向量模长最小的.

**注记** 第 (4) 问先求四个样本上的系数 $\alpha$, 再还原六个参数的调整量. 当网络的参数个数远多于样本个数时, 这种转化就有价值. 在神经网络的一阶近似中, 这样构造的核函数称为神经切线核.

**解答.** 先求系数 $\alpha$. 为看清 $K\alpha=y$ 的求解过程, 记
$$
S_0=\sum_{j=1}^4\alpha_j,\qquad
S_1=\sum_{j=1}^4x_j\alpha_j,\qquad
S_2=\sum_{j=1}^4x_j^2\alpha_j.
$$
由核函数的表达式,
$$
(K\alpha)_i
=\sum_{j=1}^4(5x_i^2x_j^2+8x_ix_j+5)\alpha_j
=5S_2x_i^2+8S_1x_i+5S_0.
$$
$y$ 恰好是多项式 $x^2$ 在四个训练输入处的取值. 因此, $K\alpha=y$ 等价于两个次数不超过 $2$ 的多项式 $5S_2x^2+8S_1x+5S_0$ 和 $x^2$ 在四个点取值相同, 也就等价于
$$
S_0=0,\qquad S_1=0,\qquad S_2=1/5.
$$
取 $\alpha_4=0$, 上述条件变为
$$
\alpha_1+\alpha_2+\alpha_3=0,\qquad
-\alpha_1+\alpha_3=0,\qquad
\alpha_1+\alpha_3=1/5.
$$
解得一组系数
$$
\boxed{\alpha=\left(\begin{smallmatrix}1/10\\-1/5\\1/10\\0\end{smallmatrix}\right).}
$$
对任意满足 $K\alpha=y$ 的系数向量, 都有同样的 $S_0,S_1,S_2$. 因而
$$
h_*=J^T\alpha
=\left(\begin{smallmatrix}S_2\\2S_2\\2S_1\\S_0\\2S_1\\2S_0\end{smallmatrix}\right)
=\boxed{\left(\begin{smallmatrix}1/5\\2/5\\0\\0\\0\\0\end{smallmatrix}\right)}.
$$
这同时说明 $h_*$ 与所选的解 $\alpha$ 无关. 代回预测变化曲线,
$$
p_{h_*}(x)=(1/5+2\cdot2/5)x^2=x^2,
$$
所以 $Th_*=y$.

最后比较向量模长. 任取另一个满足 $Th=y$ 的参数调整 $h$, 令 $v=h-h_*$. 则
$$
Jv=Jh-Jh_*=y-y=0.
$$
又因为 $h_*=J^T\alpha$, 有
$$
h_*\cdot v=(J^T\alpha)\cdot v=\alpha\cdot(Jv)=0.
$$
也就是说, 任何其他解都等于 $h_*$ 加上一个与它正交的向量. 由勾股关系,
$$
\|h\|^2=\|h_*+v\|^2=\|h_*\|^2+\|v\|^2
\geq\|h_*\|^2.
$$
等号成立当且仅当 $v=0$, 即 $h=h_*$. 因此 $h_*$ 是向量模长最小的唯一参数调整, 最小模长为
$$
\boxed{\|h_*\|=\sqrt{(1/5)^2+(2/5)^2}=1/\sqrt5.}
$$
