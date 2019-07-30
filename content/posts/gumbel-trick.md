---
date: 2017-08-17T23:27:55-04:00
title: The Gumbel Trick
math: true
<!-- comments: true
length: 6 min read
math: true
tagline: Calculating log-partition functions for discrete probabiity distributions has never been so easy. 
categories:
- blog -->
---

Until I read the [recent paper at ICML 2017](https://arxiv.org/pdf/1706.04161.pdf), I hadn't heard of the Gumbel trick. There is surprisingly little online about the Gumbel trick---related to the more popular [Gumbel-max trick](https://hips.seas.harvard.edu/blog/2013/04/06/the-gumbel-max-trick-for-discrete-distributions/)---so here we go.


We often want to characterize probabilistic models in discrete situations. The Gumbel trick allows us to estimate as associated [partition function](https://en.wikipedia.org/wiki/Partition_function_(mathematics)) $Z$ with relative ease. At a high level, finding $Z$ or even $\log Z$ is very difficult; however, we can add some noise and compute the [maximum a posteriori](https://en.wikipedia.org/wiki/Maximum_a_posteriori_estimation) (MAP) more easily through approximation methods. If we repeat this process enough times, we get a reliable estimate of $Z$.

In complexity theory, we know that finding the MAP is [NP-hard](https://en.wikipedia.org/wiki/NP-hardness) but can be [approximated quickly in practice](http://cs.nyu.edu/~dsontag/papers/sontag_uai08.pdf). Note that the partition function is a harder even still, containing [\#P-hard](https://en.wikipedia.org/wiki/Sharp-P) problems.

Let's formalize. For finite sample $\mathcal{X}$ of size $N$, we define an unnormalized mass function $\tilde{p} : \mathcal{X} \to [0, \infty)$ and let $Z:= \sum_{x \in \mathcal{X}} \tilde{p}(x)$ be the normalizing partition function. We then define $\phi(x) := \ln \tilde{p}(x)$ as the log-unnormalized probabilities or the potential function.

Our algorithm is then:

 1. Add Gumbel distributed noise to our potential functions
 2. Find the MAP of this perturbed value over all $x \in \mathcal{X}$. Call this value $z_i$
 3. Repeat steps 1 and 2 multiple times and then collect the mean $\hat{Z} \approx Z$

## But why?

We want to prove the supposedly useful Gumbel trick then using the *Perturb-and-MAP* method, specifically

$$\max_{x \in \mathcal{X}} \{ \phi(x) + \gamma(x) \} \sim \text{Gumbel}(-c + \ln Z)$$

where $\phi(x)$ has been defined as the potentials and $\gamma \sim \text{Gumbel}(-c)$ where $c$ is the [Euler-Mascheroni constant](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant). 

Because the mean of $\text{Gumbel}(\mu)$ is $\mu + c$, we can show that $\ln Z$ and then $Z$ are recoverable.

## A brief Gumbal interlude

The [Gumbel distribution](https://en.wikipedia.org/wiki/Gumbel_distribution) is traditionally used to model the maxima of already extreme events. For example, what will be worst earthquake next year given the measurements of the worst earthquakes in the past 10 years in San Francisco? 

A variable $X$ drawn from $\text{Gumbel}(\mu)$ has the probability distribution

$$f(x) = e^{-(z + e^{-z})}$$

where $z = x - \mu$. For this problem, we set the scale parameter $\beta = 1$ whereas the location parameter $\mu$ remains free.

Additionally, the [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) of a $\text{Gumbel}(\mu)$ is

$$F(x) = e^{-e^{-(x-\mu)}}$$

This will become useful!

## The actual proof
We want to find the value of $x$ that maximizes $\phi(x) + \gamma(x)$. Thinking in terms of the CDF, we want all values of $x \in \mathcal{X}$ to produce smaller or equal values

$$
\begin\{align\*\}
P\left (\max\_\{x \in \mathcal\{X\} \} \( \phi(x) + \gamma(x) \) \right ) &=  \prod\_\{x \in \mathcal\{X\}\} F(t - \phi(x))  \newline
&= \exp \left ( - \exp \left (\sum\_\{x \in \mathcal\{X\}\} -(t - \phi(x) + c) \right ) \right ) \newline
&= \exp \left ( - Z \exp \left (-(t +c)  \right )  \right ) \\ \newline
&= \exp \left ( - \exp \left (-(t +c - \ln Z)  \right )  \right ) \newline
&\Rightarrow F(t) \text\{ where \}  t \sim \text\{Gumbel\}(-c + \ln Z) \newline
\end\{align\*\}
$$
The first equality follows from multiplying the Gumbel CDF $F(t)$ of $\gamma(x)$ of all possible values to capture the maximum. The second equality comes from expanding out the Gumbel CDF. The third equality consolidates the potential functions such that $Z = \sum_{x \in \mathcal{X}} \phi(x)$. The fourth equality sticks the $\ln Z$ back into the $\exp$ function. The last equality compresses the probability back into the Gumbel CDF, except set at a different location.

## Other proofs
I enjoyed and modeled this post after the proof from [Hazan and Jaakkola 2012](https://people.csail.mit.edu/tommi/papers/HazJaa-ICML12.pdf); however, [Matej et al 2017](https://arxiv.org/pdf/1706.04161.pdf) has another proof using a cleverly chosen $g$ function and competing exponential clocks.