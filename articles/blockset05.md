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
> blockset add ../boost-1.83/
kksm7szr978j0gedz3c07adr06kc0nb04jarnbgkqktah
> blockset info

> blockset add ../boost-1.84/

> blockset info

```

```
> cd new/
> blockset add ../boost-1.85/
c1mjsv60hjqf89yagx53ya8bvg9d2b0t9vrkkbcn0jkrq
> blockset info

```

Note that the `new/cdt0/` repository has a comparable size with the `Boost-1.85` directory, while `old/cdt0` has a size of only ...MB more than `Boost-1.83` because Blockset detects duplicates in data. 

TODO: Add a tar file.

Authors of the demonstration: Sergey Shandar and Alex Fedin.
