---
layout: default
title: Irene Chen
---
<!-- ## About Me -->

<img class="profile-picture" src="irene.jpg">

I am a Ph.D. candidate at [MIT CSAIL](https://www.csail.mit.edu/), advised by Professor [David Sontag](http://people.csail.mit.edu/dsontag/) in the [Clinical Machine Learning](http://clinicalml.org/) group. My research focuses on machine learning and its applications to solving important real-world problems including *healthcare* and *fairness*.

Prior to MIT, I worked at [Dropbox](www.dropbox.com) as Data Scientist, Chief of Staff, and Machine Learning Engineer. I graduated from [Harvard](https://www.seas.harvard.edu/) with a joint AB/SM in Applied Math and Computational Engineering where I researched with [Michael Luca](http://www.hbs.edu/faculty/Pages/profile.aspx?facId=602417) and [Ben Edelman](http://www.hbs.edu/faculty/Pages/profile.aspx?facId=417579).

You can email me at iychen [at] mit [dot] edu or reach me on [Twitter](http://www.twitter.com/irenetrampoline).

## News
 <!-- * I am organizing the NIPS 2018 Healthcare in Machine Learning workshop -->
 * May '18: Our paper [Why is My Classifier Discriminatory?](https://arxiv.org/abs/1805.12002) is now available on arXiv.
 * May '18: I received the [Seth J. Teller Award for Excellence, Inclusion, and Diversity](http://www.eecs.mit.edu/news-events/announcements/eecs-celebrates-2018-recognizing-departments-outstanding-contributors).
 * Apr '18: I ran the [2018 Boston Marathon](https://twitter.com/irenetrampoline/status/986059482022273024) and raised over $10,000 for charity!
 * Jan '18: I was selected as a Finalist for the [Paul & Daisy Soros Fellowship](https://www.pdsoros.org/).

## Research
Current research projects include
1. **Congestive Heart Failure**: How can we combine electronic health records with mechanistic information to better treat heart failure? What signal do echocardiograms contain? In collaboration with [Beth Israel Deaconess Medical Center](http://www.bidmc.org/).
2. **Health Knowledge Graph**: How can we build a structure to capture causal information on symptoms and diseases? Can we capture and quantify error in the model?
3. **Fairness in machine learning**: How can we make models that represent people of all genders and races? In a world of limited resources, how can we create more inclusive models?

## Papers

<script>
function absCHF() {
    var x = document.getElementById("abs-fairness");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
</script>

**Subtype Disease Progression in Heart Failure with Preserved Ejection Fraction.** Irene Chen, Rajesh Ranganath, David Sontag. *In preparation.*

**The Disparate Impacts of Medical and Mental Health with AI.** Irene Chen, Peter Szolovits, Marzyeh Ghassemi. *In submission.* 

**Why Is My Classifier Discriminatory?** Irene Chen, Fredrik D. Johansson, David Sontag. *In submission.* <br>
<a id="abs-fairness-button" onclick="absCHF()">[abstract]</a> [[arXiv]](https://arxiv.org/abs/1805.12002) 

<div id="abs-fairness" style="display:none;">
<blockquote>Recent attempts to achieve fairness in predictive models focus on the balance between fairness and accuracy. In sensitive applications such as healthcare or criminal justice, this trade-off is often undesirable as any increase in prediction error could have devastating consequences. In this work, we argue that the fairness of predictions should be evaluated in context of the data, and that unfairness induced by inadequate samples sizes or unmeasured predictive variables should be addressed through data collection, rather than by constraining the model. We decompose cost-based metrics of discrimination into bias, variance, and noise, and propose actions aimed at estimating and reducing each term. Finally, we perform case-studies on prediction of income, mortality, and review ratings, confirming the value of this analysis. We find that data collection is often a means to reduce discrimination without sacrificing accuracy.</blockquote>
</div>

**Sources of Unfairness in Intensive Care Unit Mortality Scores.** Irene Chen, Fredrik D. Johansson, David Sontag. *Women in Machine Learning Workshop at NIPS 2017.*

## Teaching

At Harvard, I was awarded the [Derek Bok Center Certificate of Distinction in Teaching](https://bokcenter.harvard.edu/awards) for outstanding teaching evaluations.

I have served on the teaching staff for the following Harvard classes.
 * Algorithms and Data Structures, Jelani Nelson
 * Microeconomic Theory, Ed Glaeser
 * Multivariable Calculus, Evelyn Hu and Avi Shapiro
 * Differential Equations, Margo Levine and Avi Shapiro
 * Linear Algebra and Real Analysis I, Paul Bamberg
 * Linear Algebra and Real Analysis II, Paul Bamberg

---

## Website credit

This is based on a [Jekyll](https://jekyllrb.com/) template. You can find the full source code on [GitHub](https://github.com/bk2dcradle/researcher).

<!-- <h1 class="owner-name">About</h1>

{{site.about}}

<div class="pagination">
  {% if site.owner.linkedin %}
    <a href="{{ site.owner.linkedin }}" class="social-media-icons"><i class="fa fa-2x fa-linkedin" aria-hidden="true"></i></a>
  {% endif %}
  {% if site.owner.email %}
    <a href="mailto:{{ site.owner.email }}" class="social-media-icons"><i class="fa fa-2x fa-envelope" aria-hidden="true"></i></a>
  {% endif %}
  {% if site.owner.twitter %}
    <a href="{{ site.owner.twitter }}" class="social-media-icons"><i class="fa fa-2x fa-twitter" aria-hidden="true"></i></a>
  {% endif %}
  {% if site.owner.github %}
    <a href="{{ site.owner.github }}" class="social-media-icons"><i class="fa fa-2x fa-github" aria-hidden="true"></i></a>
  {% endif %}
  {% if site.owner.stackexchange %}
    <a href="{{ site.owner.stackexchange }}" class="social-media-icons"><i class="fa fa-2x fa-stack-overflow" aria-hidden="true"></i></a>
  {% endif %}
</div>
 -->
