---
title: Color
description: Use color class helpers to add custom colored text and backgrounds on elements.
permalink: /utilities/:basename
---

# {{ page.title }}

Applying colored text or a background from your palette is easy with these utilities.

## Text

Use `has-X-text` to modify an element's text color, where `X` is a color from `$color-full-palette` in `_config.scss`.

<p class="has-primary-text-color">I'm using $color-primary!</p>
<p class="has-gray800-text-color">I'm using $color-gray800!</p>
<p class="has-success-text-color">I'm using $color-success!</p>

```html
<p class="has-primary-text-color">I'm using $color-primary!</p>
<p class="has-gray800-text-color">I'm using $color-gray800!</p>
<p class="has-success-text-color">I'm using $color-success!</p>
```

## Backgrounds

Similar to text, use `has-X-bg` to modify an element's `background-color`, where `X` is a color from `$color-full-palette`.

<p class="has-primary-bg-color">I'm using $color-primary!</p>
<p class="has-gray800-bg-color">I'm using $color-gray800!</p>
<p class="has-success-bg-color">I'm using $color-success!</p>

```html
<p class="has-primary-bg-color">I'm using $color-primary!</p>
<p class="has-gray800-bg-color">I'm using $color-gray800!</p>
<p class="has-success-bg-color">I'm using $color-success!</p>
```

{% include partials/edit-on-github.html %}
