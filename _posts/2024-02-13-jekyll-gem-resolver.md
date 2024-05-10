---
type: article
title: Using SASS files from Ruby gems with Jekyll
tags: ["How-to", "Jekyll"]
permalink: /articles/using-sass-files-from-ruby-gems-with-jekyll/
redirect_from:
  - /articles/using-sass-files-from-ruby-gems-with-jekyll
  - /2024/02/13/using-sass-files-from-ruby-gems-with-jekyll
  - /2024/02/13/using-sass-files-from-ruby-gems-with-jekyll/
  - /2024/02/13/jekyll-gem-resolver
  - /2024/02/13/jekyll-gem-resolver/
article_header:
  type: overlay
  theme: dark
  background_color: "#363649"
  background_image:
    src: assets/img/posts/2024-02/pexels-jessica-lewis-thepaintedsquare-583847.jpg
    alignment: 61%
---

This blog, as well as my other static websites, are all built using [Jekyll][jekyll].
It's a great tool, and really easy to work with, because it takes care of related build steps
like compiling your SCSS sources to CSS.
While doing some refactoring, I wanted to switch from using a pre-built version of the
[Bootstrap CSS framework][bootstrap] to building it from its SCSS source.

This involves three things (as outlined in the [Bootstrap documentation][bootstrap-build-docs]):

1. Getting the Bootstrap SCSS files
2. Turning the SCSS files into pure CSS
3. Transforming the resulting CSS files using Autoprefixer to add vendor prefixes

# How to: Build Bootstrap from source using Jekyll

As described by [this blog post][blog-bootstrap-jekyll], that is quite easy:

1. Copy all SCSS files from Bootstrap into your source repository.
2. Use the [jekyll-sass-converter] plugin. As its already bundled with Jekyll by default, we don't have to do anything special.
3. Use the [jekyll-autoprefixer] plugin.

Well... that's good, except for the part number 1 _"Copy all SCSS files from Bootstrap"_.
Isn't that what we have package managers for?
There already is an official [bootstrap rubygem][bootstrap-gem], so preferably I would like to use that.
Just add it to your `Gemfile`, and reference it in your `_config.yml`:

```ruby
# Gemfile
gem "bootstrap", "~> 5.3.2"
```

```yaml
# _config.yml
sass:
  load_paths:
    - ???
```

...but how to actually reference the `bootstrap` gem in your `_config.yml`?

Turns out that Jekyll does not have a built-in facility for referencing files from Gems directly,
so I just wrote a [small Jekyll plugin][jekyll-gem-resolver] that allows me to do just that:

```yaml
# _config.yml
sass:
  load_paths:
    - 'gem:bootstrap/assets/stylesheets'

gem_resolver:
  transform: # Specify where gem references might be found
    - sass.load_paths
```

Instead of just transforming every string starting with `gem:` in the configuration (which could have unintended side-effects)
or hard-coding the paths where to look for gem references (which would not work well with additional plugins),
I made the parts of the configuration where gem references are replaced [fully configurable](https://github.com/cr7pt0gr4ph7/jekyll-gem-resolver?tab=readme-ov-file#path-syntax).

# The full setup

<div class="error" markdown="1">
{:.include-in-toc}
#### Caveat: Pin execjs to version `2.7.0` to avoid runtime errors

Although not related to my plugin but to `jekyll-autoprefixer`, I hope that this PSA saves some people the headache I had:

Due to [a bug with ExecJS][execjs-bug] (which is used by jekyll-autoprefixer/[`autoprefixer-rails`][autoprefixer-rails] internally to actually run
[autoprefixer]),
one has to explicitly force the ExecJS gem to a last version not affected by the bug, which is version 2.7.0
to avoid some confusing runtime errors:

```ruby
# Gemfile
# Required to avoid runtime errors in jekyll-autoprefixer caused by ExecJS 2.8.0 and later
gem "execjs", "= 2.7.0"
```
</div>

My whole setup (excluding totally unrelated parts) for building Bootstrap from the [bootstrap rubygem][bootstrap-gem],
including Autoprefixer, now looks like this:

```yaml
# _config.yml

plugins:
  - jekyll-gem-resolver
  - jekyll-autoprefixer

sass:
  load_paths:
    - 'gem:bootstrap/assets/stylesheets'

gem_resolver:
  transform:
    - sass.load_paths
```

Besides the `bootstrap` gem, you also have to reference the `jekyll-gem-resolver` and `jekyll-autoprefixer` gems in your `Gemfile`:

```ruby
# Gemfile
source "https://rubygems.org"

gem "jekyll", "~> 4.3.3"

# Acquire bootstrap to use its SASS sources
gem "bootstrap", "~> 5.3.2"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-gem-resolver", "~> 1.1.1"
  gem "jekyll-autoprefixer", "~> 1.0"
end

# Required to avoid runtime errors in jekyll-autoprefixer caused by ExecJS 2.8.0 and later
gem "execjs", "= 2.7.0"

# The remainder of this file is just taken from the default Jekyll template:
# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
```

Importing files from the Bootstrap gem looks just like any other SCSS code:

```scss
// assets/css/default.scss

// ...
@import "bootstrap";
// ...
```

Neat!

# Conclusion

I've published the plugin on GitHub and RubyGems.
You can find the documentation and source code for the plugin [**here**][jekyll-gem-resolver].

[jekyll]: https://jekyllrb.com/
[bootstrap]: https://github.com/twbs/bootstrap
[bootstrap-build-docs]: https://getbootstrap.com/docs/5.3/getting-started/download/#source-files
[bootstrap-gem]: https://github.com/twbs/bootstrap-rubygem
[blog-bootstrap-jekyll]: https://medium.com/codex/how-to-add-bootstrap-5-sass-to-jekyll-e3b189f71552

[jekyll-sass-converter]: https://github.com/jekyll/jekyll-sass-converter
[jekyll-autoprefixer]: https://github.com/vwochnik/jekyll-autoprefixer
[jekyll-autoprefixer-sourcemaps]: https://github.com/vwochnik/jekyll-autoprefixer/pull/16
[jekyll-gem-resolver]: https://github.com/cr7pt0gr4ph7/jekyll-gem-resolver
[jekyll-gem-resolver-gem]: https://rubygems.org/gems/jekyll-gem-resolver
[autoprefixer]: https://github.com/postcss/autoprefixer
[autoprefixer-rails]: https://github.com/ai/autoprefixer-rails
[execjs-bug]: https://github.com/rails/execjs/issues/99
