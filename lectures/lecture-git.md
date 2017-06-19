---
layout: page
title:  Version Control with Git, HTML Basics
permalink: /lectures/lecture-git/
nomenu: true
---

Welcome to CS-5630 / CS-6630 - Visualization. In this class we will use a mix of traditional slides and interactive documents where we ill go through HTML, JavaScript, etc. These notes are meant for classroom use but also for reading them offline. This is our first coding lecture. We will cover the basics of version control with git, as well as the basics of the web stack.

## Git

We will be using a version control tool called git to track changes to our code. We'll also be using Github, an online tool for hosting git repositories.

You should already have git installed, if not see the [official documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on how to install git on your operating system. 


### Why version Control?
 
 * **Keep copies of multiple states of files** 
  By committing you record a state of the file to which you can go back any time.
 * **Create alternative states**
 Imagine you just want to try out something, but you realize you have to modify multiple files. You're not sure whether it works or is worth it. With version control you can just create a **branch** where you can experiment or develop new features without changing the main or other branches.
 * **Collaborate in teams** 
 Nobody wants to send code via e-mail or share via Dropbox. If two people work on a file at the same time it's unclear how to merge the code. Version control lets you keep your code in a shared central location and has dedicated ways to merge and deal with conflicts. 
 * **Keep your work safe**
 Your hard drive breaks. Your computer is stolen. But your code is safe because you store it not only on your computer but also on a remote server. 
 * **Share**
 You developed something awesome and want to share it. But not only do you want to make it available, you're also happy about contributions from others! 


![Version Control with Central Repository](images/centralized.png)

### Types of Version Control: Central Repository

 * Everybody needs to write to one server
 * All operations (history, commit, branches) require server connection
 * The traditional model: CVS, SVN, etc. 
 * Pros: 
   * Simple
 * Cons: 
   * Complex for larger and community projects
        * Who is allowed to write? 
        * How do you apply changes that someone outside your team made? 
        


### Types of Version Control: Distributed Version Control


![Distribute Version Control](images/distributed.png)

 * Everybody has a full history of the repository locally
 * No dedicated server - every node is equal.
   * In practice: often server is used for one "official" copy of code.
    But: server by convention only, no technical difference.
 * Pros: 
    * No access issues
        * Make a copy and hack away
        * Ask if partner wants to accept your changes
    * Everything is local
        * Fast!
        * No internet connection required
        * Commit often model (once per feature) - don't sync all the time.
 * Cons:
    * Extra effort to distinguish between committing and pushing/pulling (synchronizing). 

### Implementations

 * Centralized
    * CVS
    * SVN
    * Team Foundation Server 
    * ...
 * Distributed
    * git
    * Mercurial
    * ...
 * We will be using git in this lecture. 
 
### git

 * Created by Linus Torvalds, 2005
 * Meaning: British English slang roughly equivalent to "unpleasant person". 
 * git – the stupid content tracker.

*I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'git'. -- Linus Torvalds*

### Why git?

 * Popular (~50% of open source projects)
 * Truly distributed
 * Very fast
 * Everything is local
 * Free
 * Safe against corruptions
 * GitHub!
 
### git model 
 
Whiteboard sketch of git with a server. A git repository is essentially a large graph.
 
### git tutorial

This is a quick intro to git, used in combination with GitHub. This is not a complete tutorial, but will use the most important git features. 

We start by configuring git

{% highlight bash linenos %}
$ git config --global user.name "YOUR NAME"
$ git config --global user.email "YOUR EMAIL ADDRESS"
{% endhighlight %}

Make sure that his is set to your official school address and your correct name!

**Create a folder for your project**

{% highlight bash linenos %}
$ mkdir myProject 
$ cd myProject/
{% endhighlight %}


**Initalize the git repository**
{% highlight bash linenos %}
$ git init 
Initialized empty Git repository in ../myProject/.git/
{% endhighlight %}

**What does git do to your file system?**
{% highlight bash linenos %}
# Let's look at what git creates
$ ls .git/ 
branches  config  description  HEAD  hooks  info  objects  refs

# The interesting stuff is in the config file
$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true


# More interesting for a project with branches and remotes 
$ cat .git/config 
[core]
       	repositoryformatversion = 0
       	filemode = true
       	bare = false
       	logallrefupdates = true
       	ignorecase = true
       	precomposeunicode = true
[remote "origin"]
       	url = https://github.com/dataviscourse/2016-dataviscourse-website
       	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
       	remote = origin
       	merge = refs/heads/master

{% endhighlight %}

**Now let's create a file**
{% highlight bash linenos %}
$ echo 'Hello World' > demo.txt
$ cat demo.txt 
Hello World
{% endhighlight %}

**Let's add it to version control**
{% highlight bash linenos %}
$ git add demo.txt
{% endhighlight %}


**Let's look at what is going on with the repository**
{% highlight bash linenos %}
$ git status
# On branch master
#
# Initial commit
#
# Changes to be committed:
#   (use "git rm --cached <file>..." to unstage)
#
#       new file:   demo.txt
#
{% endhighlight %}

That means: git knows that it's supposed to track this file, but it's not yet versioned.
 
**Let's commit the file.** Once a file is committed, it's state is recorded and you can go back to previous versions any time.

{% highlight bash linenos %}
# The -m option specifies the commit message. If you don't use it you'll go into an editor to enter your commit message.  
$ git commit -m "Committing the test file" 
[master (root-commit) 3be5e8c] Wrote to demo
 1 file changed, 1 insertion(+)
 create mode 100644 demo.txt

# Did it work?
$ git status
# On branch master
nothing to commit, working directory clean
{% endhighlight %}

That means that now the file is tracked and committed to git. But it's still only stored on this one computer! 

**Next, we change a file and commit it again.**

{% highlight bash linenos %}
# Now let's change something
$ echo 'Are you still spinning?' >> demo.txt 
$ cat demo.txt 
Hello World!
Are you still spinning?

# Let's check the status of git!
$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   demo.txt
#
no changes added to commit (use "git add" and/or "git commit -a")

# So git knows that something has changed, but hasn't recorded it. Let's commit. 
$ git commit -m "Added a line to the demo file" 
On branch master
Changes not staged for commit:
	modified:   demo.txt
	
# That didn't work! You have to add all the files you want to commit every time. There is a shorthand that you can use to add all the tracked files: append '-a'.
$ git commit -a -m "added a line to the demo file" 
[master b03178f] added a line to the demo file
 1 file changed, 1 insertion(+)

# Better. Now, let's look at what happened up to now
$ $ git log
  commit bf92da7ad772480f7fe5f28ef105227383e07a45
  Author: Alexander Lex <alex@sci.utah.edu>
  Date:   Wed Aug 24 14:39:45 2016 -0600
  
      Added another line to the demo file
  
  commit 2886218c7f65ba3c2d7d7339e2b8a7b9ab4420c0
  Author: Alexander Lex <alex@sci.utah.edu>
  Date:   Wed Aug 24 14:37:06 2016 -0600
  
      added demo file
{% endhighlight %}

Through this cycle of editing, adding and committing, you can develop software in a linear fashion. Now let's see how we can create alternate versions. 

### Branching

**Now let's create a branch**

{% highlight bash linenos %}
$ git branch draft

# This created a branch with the name draft. Let's look at all the other branches
$ git branch
  draft
* master

{% endhighlight %}


We have two branches, draft and master. The * tells us the active branch (the HEAD). 

The files in your folders are in the state as they are stored in the active branch. When you change the branch the files are changed, removed or added to the state of the target branch.
 
**Let's switch the branch.**

{% highlight bash linenos %}
$ git checkout draft
Switched to branch 'draft'

# Let's see if there is something different
$ cat demo.txt 
Hello World!
Are you still spinning?

# No - it's the same! Now let's edit.
$ echo "Spinning round and round" >> demo.txt 
$ cat demo.txt 
Hello World!
Are you still spinning?
Spinning round and round

# And commit
$ git commit -a 
[draft 059daaa] Confirmed, spinning
 1 file changed, 1 insertion(+)
{% endhighlight %}
 
We have now written changes to the new branch, draft. The master branch should remain unchanged. Let's see if that's true.  
 
{% highlight bash linenos %}
# Now let's switch back to master again
$ git checkout master
Switched to branch 'master'

$ cat demo.txt 
Hello World!
Are you still spinning?
{% endhighlight %}

The text we added isn't here, as expected! Next we're going to change something in the main branch and thus cause a conflict. 

{% highlight bash linenos %}
# Writing something to the front and to the end in an editor
$ cat demo.txt 
I am here!
Hello World!
Are you still spinning?
Indeed!

# committing again
$ git commit -a 
[master 8437327] Front and back
 1 file changed, 2 insertions(+)
{% endhighlight %}
 
At this point we have changed the file in two different branches of the repository. This is great for working on new features without breaking a stable codebase, but it can result in conflicts. 
**Let's try to merge those two branches.**
 
 {% highlight bash linenos %}
# the git merge command merges the specified branch into the currently active one. "master" is active, and we want to merge in "draft". 
$ git merge draft
Auto-merging demo.txt
CONFLICT (content): Merge conflict in demo.txt
Automatic merge failed; fix conflicts and then commit the result.

# The result
$ cat demo.txt 
I am here!
Hello World!
Are you still spinning?
<<<<<<< HEAD
Indeed!
=======
Spinning round and round
>>>>>>> draft

# The first line was merged without problems, The final line, where we have two alternative versions is a conflict. We have to manually resolve the conflict.

# Once this is done, we can commit again.
$ git commit -a 
[master 4dad82f] Merge branch 'draft'

# Everything back in order.
$ git status 
# On branch master
nothing to commit, working directory clean
{% endhighlight %}

These are the basics of git on a local server. Now we'll learn how to sync with other people. This can be done with just git, but we'll be using GitHub as we're also using GitHub in the homeworks.

### Working with GitHub

First, we'll create a new repository on github by going to  [https://github.com/new](https://github.com/new). 

![New repo interface on GitHub](images/newrepo.png)

Now let's clone the repository from GitHub.
 
{% highlight bash linenos %}

$ git clone https://github.com/alexsb/Demo.git

# Let's see how the config looks for this one.
$ cat .git/config 
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/alexsb/demo.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
{% endhighlight %}



This creates a local copy of the (empty) GitHub repository. We will just start working with that and commit and push the code to the server. If you'd like to add an existing repository to GitHub, follow [these instructions](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/).



{% highlight bash linenos %}
# What's currently in the repository?
$ ls
LICENSE    README.md
# Write something to demo.txt.
$ echo "Hello world!" > demo.txt
echo "Hello world" > demo.txt
# Add demo.txt to the repository.
$ git add demo.txt
# Commit the file to the repository.
$ git commit -a -m "added demo file" 
[master 2e1918d] added demo file
 1 file changed, 1 insertion(+)
 create mode 100644 demo.txt
# Pushing it to the server!
$ git push 
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 324 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/alexsb/demo.git
   8e1ecd1..2e1918d  master -> master
{% endhighlight %}

We have now committed a file locally and pushed it to the server, i.e., our local copy is in sync with the server copy. 
Note that the `git push` command uses the origin defined in the config file. You can also push to other repositories!

Next, we will make changes at another place. We'll use the GitHub web interface to do that. 

Once these changes are done, our local repository is out of sync with the remote repository. To get these changes locally, we have to pull from the repository:

{% highlight bash linenos %}
$ git pull
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/alexsb/demo
   2e1918d..5dd3090  master     -> origin/master
Updating 2e1918d..5dd3090
Fast-forward
 demo.txt | 1 +
 1 file changed, 1 insertion(+)
# Let's see whether the changes are here 
$ cat demo.txt 
Hello world
Are you still spinning?

{% endhighlight %}

### Other GitHub Features

* **GitHub Issues** 
 Github Issues are a great way to keep track of open tasks and problems. Issues can be references and closed from commits. 
* **Forking** 
 Forking is essentially making use of the distributed nature of git, while having the benefits of a server. When you fork a repository you make a clone of someone else's code that you are not allowed to read. The repository appears in your github account and you can start editing the code. If you think you improved the code, you can send a "pull request" to the original owner. The owner can then review your code and merge your modifications into his main repository. Forking is hence virtually the same as branching, with the exception that it resolves issues with write permissions.

### GUI Clients

* **GitHub Desktop** 
  Good option if you want a GUI client. [Download here](https://desktop.github.com/)
* **Integrated in IDEs** 
  Many operations can be done out of a IDE such as WebStorm 
  
### Getting updates to the homeworks
 
The homeworks are hosted in a git repository. Every time we release a homework we will just update the repository. You can then pull from that repository to get the latest homework on your computer.

To get the homework repository, run the following:

{% highlight bash linenos %}
$ git clone https://github.com/dataviscourse/2016-dataviscourse-homework -o homework
$ cd 2016-dataviscourse-homework
{% endhighlight %}

Note that by using the `-o homework` option we're not using the default remote `origin` but a user-defined remote called `homework`.

Next, create a new repository on the Github. 

Ensure your new repository is private and don't click the option to "Initialize the repository with a README".

Run the two commands described on GitHub under the heading "Push an existing repository from the command line". For my repository these are: 

{% highlight bash linenos %}
$ git remote add origin https://github.com/alexsb/dataviscourse16-hw-lex-alexander.git
$ git push -u origin master
{% endhighlight %}

Now your homework repository is all set!

### Committing

While working on homework assignments, periodically run the following:

{% highlight bash linenos %}
$ git add -A
$ git commit -m "Describe your changes"
$ git push
{% endhighlight %}

Remember, the `git commit` operation takes a snapshot of your code at that point in time but doesn't write to the server. 

The `git push` operation pushes your local commits to the remote repository.

You should do this frequently: as often as you have an incremental, standalone improvement.

#### Getting new homework assignments

When we release a new assignment we will simply add it to the [homework github repository](https://github.com/dataviscourse/2016-dataviscourse-homework).

To get the latest homework assignments and potential updates or corrections to the assignment, run the following.

{% highlight bash linenos %}
$ git pull homework master
{% endhighlight %}

Make sure to have all your changes committed before you do that.

