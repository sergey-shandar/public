# BlockSet 0.6. Working With Directories and Sync By Copy

The main new feature of the Blockset 0.6 is the ability to add and retrieve directories recursively. In this demonstration, we use this feature and also show how to merge Blockset repositories using simple file copying. We use Boost source files and directories of different versions as samples.

## 1. Preparation

Firstly, we need to install [Rust](https://www.rust-lang.org/tools/install) and [BlockSet](https://crates.io/crates/blockset):

``` shell
cargo install blockset
```

Then we download and unpack [Boost](https://www.boost.org/) [1.83.0](https://www.boost.org/users/history/version_1_83_0.html), [1.84.0](https://www.boost.org/users/history/version_1_84_0.html), and [1.85.0](https://www.boost.org/users/history/version_1_85_0.html).

|Version     |Tar File Size|Directory Size|
|------------|-------------|--------------|
|boost-1_83_0|1,588 MB     |888 MB        |
|boost-1_84_0|1,586 MB     |888 MB        |
|boost-1_85_0|1,609 MB     |900 MB        |

## 2. Creating BlockSet Repositories

We create two repositories in the two directories: 
- `old` is for Boost 1.83 and 1.84.
- `new` is for Boost 1.85 and its `tar` file.

The Blockset repository is the `cdt0/` directory in the current directory. If the current directory doesn't have `cdt0/`, Blockset will create one. 

Let's create the 'old' repository and add files. 

```shell
> mkdir old
> cd old/
> blockset add ../boost-1_83_0/
kksm7szr978j0gedz3c07adr06kc0nb04jarnbgkqktah
> blockset info
size: 706470318 B
> blockset add ../boost-1_84_0/
z275ny8h3qvrpakn182we5zen4kxdc87ygymex5ya9bca
> blockset info
size: 774344159 B
```

As you can see, after we added `boost-1_84_0`, the repository's size increased by only 68 M. Some tools, like [Git](https://en.wikipedia.org/wiki/Git), can also detect the same files, but we will show that Blockset can detect the same data **parts** inside big files.

Let's create the `new` repositories.

```shell
> mkdir new
> cd new/
> blockset add ../boost-1_85_0/
c1mjsv60hjqf89yagx53ya8bvg9d2b0t9vrkkbcn0jkrq
> blockset info
size: 717116556 B
> blockset add ~/Downloads/boost-1_85_0.tar
zqtrr3t2mbk9h8cshntsrs2ba8mat8ek56af2mrfw46aq
> blockset info
size: 1041867039 B
```

The original `boost-1_85_0.tar` file is about 1.6 GB. However, after we added this file to the repository, the repository increased by about 287 MB. This means Blockset finds the same parts of data **inside** the `tar` file because it uses [Content Dependent Tree](https://medium.com/@sergeyshandar/content-dependent-hash-tree-9e0f60859415). 

|Repository|Content                               |Size   |
|----------|--------------------------------------|-------|
|old       |`boost-1_83_0/` and `boost-1_84_0/`   |774 MB |
|new       |`boost-1_85_0/` and `boost-1_85_0.tar`|1042 MB|

## 3. Merging Repositories

We can merge repositories by simply copying all files from one repository into another one.

```shell
> cd old/
> cp -R ../new/cdt0/ cdt0/
> blockset info
size: 1191986590 B.
```

Now, the `old/` repository is valid and contains `boost-1_83_0/`, `boost-1_84_0/`, `boost_1_85_0/`, and `boost_1_85_0.tar` and the size of the repository is about 1.2 GB.

We can extract files and directories using `blockset get` command. For example

```shell
> cd old/
> blockset get zqtrr3t2mbk9h8cshntsrs2ba8mat8ek56af2mrfw46aq boost-1_85_0.tar
> blockset get c1mjsv60hjqf89yagx53ya8bvg9d2b0t9vrkkbcn0jkrq boost-1_85_0.json
> blockset get kksm7szr978j0gedz3c07adr06kc0nb04jarnbgkqktah boost-1_83_0/
> ls boost-1_83_0/
INSTALL         boost           boostcpp.jam    index.htm       rst.css
Jamroot         boost-build.jam bootstrap.bat   index.html      status
LICENSE_1_0.txt boost.css       bootstrap.sh    libs            tools
README.md       boost.png	doc   more
```

Authors of the demonstration: Sergey Shandar and Alex Fedin.
