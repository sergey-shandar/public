# BlockSet 0.5

One of Blockset 0.5's main new features is the possibility of adding and retrieving directories recursively. In this demonstration, we use this feature and also show how to merge Blockset repositories using simple file copying. We use Boost source files and directories of different versions as samples.

## 1. Preparation

Install Rust and then BlockSet:

```shell
cargo install blockset
```

We've downloaded and unpacked Boost 1.83.0, 1.84.0, and 1.85.0. So, our directory structure is

|Directory   |Tar Size|Directory Size|
|------------|--------|--------------|
|boost-1.83.0|1,588 MB|888 MB        |
|boost-1.84.0|1,586 MB|888 MB        |
|boost-1.85.0|1,609 MB|900 MB        |

## 2. Creating Repositories

We created 2 repositories in two directories: 
- `old` is for Boost 1.83 and 1.84.
- `new` is for Boost 1.85.

The Blockset repository is the `cdt0/` directory in the current directory. If the current directory doesn't have `cdt0/`, Blockset will create one. 

```
> mkdir old
> mkdir new
```

Then, we add all files by running two different Blockset processes simultaneously from two different terminals. 

```
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

As you can see, after we added `boost-1.84.0`, the size of the repository is increased by only 68 M.

```
> cd new/
> blockset add ../boost-1_85_0/
c1mjsv60hjqf89yagx53ya8bvg9d2b0t9vrkkbcn0jkrq
> blockset info
size: 717116556 B
> blockset add ~/Downloads/boost-1_85_0.tar
zqtrr3t2mbk9h8cshntsrs2ba8mat8ek56af2mrfw46aq
```

Note that the `new/cdt0/` repository has a comparable size with the `Boost-1.85` directory, while `old/cdt0` has a size of only ...MB more than `Boost-1.83` because Blockset detects duplicates in data. Some tools, like Git, can also detect the same file but further we will show you that Blockset can detect the same data parts inside big files, like in `boost-1_85_0.tar`.

TODO: Add a tar file.

Authors of the demonstration: Sergey Shandar and Alex Fedin.
