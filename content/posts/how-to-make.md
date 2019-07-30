---
layout: post
date: 2017-07-28T23:27:55-04:00
title: How to make this blog
length: 10 min read
comments: true
draft: false
tagline: A step-by-step process of how to make a blog just like this.
categories:
- blog
---

**Disclaimer: When written, this blog was using a different theme. The same principles still apply.**

For a long time, I thought creating a personal website was too intimidating, too cumbersome, or too much trouble. When I read other people's blogs, the authors never mentioned how they made the blog, which made me think it was effortless for them.

No more! Certainly every blog is different, but here's how I made this one. 

If I can do it, you (yes you!) can make a blog too.

## Envy is a great motivator

If you're nervous about working with code, feel free to check out [Medium](medium.com) or [Wordpress](wordpress.com). But if you want more freedom---to make things simpler or more complicated---read on.

Thanks to open source communities, we can now shamelessly rip off other people's blogs. In particular, [Jekyll](https://jekyllrb.com/) has become a popular static site generator useful for building websites out of Markdown and sharing them with others. 

This [Lagom template](https://github.com/swanson/lagom) is courtesy of [Matt Swanson](https://mdswanson.com/about/), an Indiana software engineer. 

<img src="http://i.imgur.com/Pmzk4j1.png" width="600">

I chose Matt's template because of a few key factors:

 1. it's beautiful
 2. more specifically, clean, readable format
 2. the ability to list all blog posts on one page
 3. clear instructions on how to install the blog 

The last one is particularly important since previous attempts to set up a blog derailed based on unclear instructions. We all start somewhere, and if you don't have a good guide, you'll end up with a half-built website.

Look around the web for [other Jekyll themes](https://jekyllthemes.io/) you like. All Jekyll sites have similar installation instructions; the best way to motivate yourself through the agony that is front-end development is to have a beautiful website that you're working towards.

## Start "borrowing"

Let's start stealing! I mean, downloading through open source. Note that we are assuming that you have [Github](https://github.com/) at this point.

 * [Fork the repo](https://github.com/swanson/lagom/fork)
 * Clone it: `git clone https://github.com/YOUR-GITHUB-USERNAME/lagom`
 * Install the [GitHub Pages gem](http://pages.github.com/) which includes Jekyll: `bundle install`
 * Run the Jekyll server: `jekyll serve`
 * Go to your favorite web browser and type in the server address that Jekyll tells you to. For me, it's usually `http://0.0.0.0:4000`

<img src="https://user-images.githubusercontent.com/1630275/28757171-2ee0eaac-754b-11e7-9f7f-366996583031.png" width="600">

If any part of that went wrong, don't be afraid to Google the problem since thousands of people have probably ahd the same problem.

In the spirit of transparency, here are a list of problems I ran into at this point

 * Because I had installed two versions of Jekyll (one a long time ago), `jekyll serve` did not work, and the program got confused
 * I cloned the repo into the wrong directory, which messed up some of the git references, making version control very tangled

## The fun part

At this point, you have a working website on your local computer. I'll pause here for you to do a little dance.

You now get to make the website more "you." Love orange? Change the theme color to orange. Most of the customizations you want are in [_data/theme.yml](https://github.com/swanson/lagom/blob/master/_data/theme.yml) like name, accent color, and social media links.

You might also want to change the sidebar in [_includes/sidebar.html](https://github.com/swanson/lagom/blob/master/_includes/sidebar.html) to add your bio and a logo. Because graphic design completely bores me, I uploaded a doodle of [a robot reading a book](http://irenechen.net/logo.png) instead.

Beyond the basic changes, you can consider more advanced modifications

 * Adding [Disqus commenting](http://sgeos.github.io/jekyll/disqus/2016/02/14/adding-disqus-to-a-jekyll-blog.html) so that viewers can join the conversation
 * Adding more static pages like an About page or a Contact page using the `404.html` page as a template
 * Pagination support 
 * Add [MathJax](http://gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/) to be able to type math

## Bring it online

There are a couple ways to take this beautiful site that exists on your computer onto the internet. One option here is to deploy it using [Github Pages](http://pages.github.com/), which is easy and free. Simply rename the repository on Github to be `YOUR-GITHUB-USERNAME.github.io`, and you'll be able to see your site live.

Another slightly more pro-option is to host it on your own domain. That's what `irenechen.net` is doing for me. It is not free ($12/year for me) and a tiny bit harder.

 * Buy an available domain from [any](domains.google.com) [domain](https://www.namesilo.com/) [registrar](godaddy.com). I personally use [Google Domains](domains.google.com) and will attach screenshots accordingly. 
 * Change the `CNAME` file in your repo to have one line. For me, this file only contains `irenechen.net`
 * On your domain registrar, go into the DNS settings. 
<img src="https://user-images.githubusercontent.com/1630275/28757047-ef154ed8-7548-11e7-850a-90705a5864ac.png" width="600">
 * Add the following two "custom resource records"
    - Name: `@`, Type: `A`, IPv4 address: `192.30.252.153` and `192.30.252.154`
    - Name: `www`, Type: `CNAME`, Domain name: `YOUR-GITHUB-USERNAME.github.io`
<img src="https://user-images.githubusercontent.com/1630275/28757072-392f80f6-7549-11e7-91fe-3b504060cd5e.png" width="600">
 * Wait a **loooooong** time. For me, this meant several hours. Do not panic. 
 * Visit your website (aka `irenechen.net`) to view the finished product!

## Celebrate
And that's it! In the end, web development and deploying your website is not difficult for the brain, just difficult for the patience. You will have your website crash or deviate from these "simple" instructions. Don't be afraid to take a deep breath or even start from the beginning. 

Now that you've made a website, nothing can stop you.