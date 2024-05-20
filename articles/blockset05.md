# BlockSet 0.5

One of Blockset 0.5's main new features is the possibility of adding and retrieving directories recursively. In this demonstration, we use this feature and also show how to merge Blockset repositories using simple file copying. We use Boost source files and directories of different versions as samples.

## 1. Preparation

We've downloaded and unpacked Boost 1.83.0, 1.84.0, and 1.85.0. So, our directory structure is

|Directory   |Size|
|------------|----|
|boost-1.83.0|    |
|boost-1.84.0|    |
|boost-1.85.0|    |

## 2. Creating Repositories

We created 2 repositories in two directories: 
- `old` is for Boost 1.83 and 1.84.
- `new` is for Boost 1.85.

The Blockset repository is the `cdt0/` directory in the current directory. If the current directory doesn't have `cdt0/`, Blockset will create one. 

```
> mkdir old
> mkdir new
```

Then, we add all files by running three different Blockset processes simultaneously from three different terminals. Two processes add files to the same repository, `old/cdt0/`. 

```
> cd old/
> blockset add ../boost-1.83/

> blockset info

```

```
> cd old/
> blockset add ../boost-1.84/

> blockset info

```

```
> cd new/
> blockset add ../boost-1.85/

> blockset info

```

Authors of the demonstration: Sergey Shandar and Alex Fedin.
