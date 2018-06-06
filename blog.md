---
layout: default
title: Blog
---
<h1 class="owner-name">Blog</h1>

<div class="listing">
    {% for post in paginator.posts %}
    <div class="post other link">
    	hi
      <h2></span> <a href="{{site.url}}{{post.url}}">{{ post.title }}</a></h2>
      <p class="post-date">{{ post.date | date_to_string }}</p>
      {{ post.excerpt }}
    </div>
    {% endfor %}
</div>
