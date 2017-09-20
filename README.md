### CS 5630 / CS 6630

The visualization tutorials website is built with [Jekyll](http://jekyllrb.com) and uses the github-pages plugin. It is build directly by github pages.

#### Ubuntu Prerequisites

```ShellSession
$ sudo apt-get install ruby-dev
```

#### Setup

Requires Jekyll 3 or later.
Requires Ruby 2.1.0 or later

You can find your version of Ruby with : 

``` bash
$ Ruby -v
```

If you need to update Ruby, instructions can be found [here](http://codingpad.maryspad.com/2017/04/29/update-mac-os-x-to-the-current-version-of-ruby/)

``` bash
$ gem install jekyll
$ gem install bundler
```

Then clone the repository: 

``` bash
$ git clone https://github.com/dataviscourse/tutorials
```

We're on the gh-pages branch:
``` bash
$ cd tutorials
$ git checkout gh-pages
```

Now install the necessary stuff: 
``` bash
$ bundle install
```


#### Generate and/or Serve Site

``` bash
$ bundle exec jekyll serve
```

#### View Site

```ShellSession
$ open http://0.0.0.0:4000/tutorials/
```

### Liquid Syntax

https://github.com/Shopify/liquid/wiki/Liquid-for-Designers

### Windows Installation Instructions

http://jekyll-windows.juthilo.com/1-ruby-and-devkit/

### Deployment

Just push your changes, GitHub Pages will automatically build. 

### Troubleshooting

See [this tutorial](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) if you're running into problems.

