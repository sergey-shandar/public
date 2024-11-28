# blockset v0.2 

I'm pleased to announce that `blockset` v0.2 has been released. It's the first working version.

## What's the `blockset`?

The `blockset` application is a command line program that can store and retrieve data blocks using a content-dependent tree (CDT) hash function as a universal address of the blocks. The [CDT](https://medium.com/@sergeyshandar/content-dependent-hash-tree-9e0f60859415) hash function splits data into small connected parts of various sizes. The algorithm allows the detection of the same parts in blocks, even if they are located in different positions of the files. In essence, storage and network systems based on a CDT hash function should save space and traffic by detecting the same duplicate parts in data blocks. For example, it may save significant space if we store build artifacts of [CI](https://en.wikipedia.org/wiki/Continuous_integration) in such storage.  

## CDT function in the `blockset`

There are a lot of possible CDT hash functions. As a community, we should select only a few, to make communication and storage more efficient. After multiple attempts, I selected one, which I call `CDT0`. It uses [SHA224](https://en.wikipedia.org/wiki/SHA-2) as a compress function and [Crockford's base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32) (45 characters) as a printable address, suitable for URLs and file names. I would like to publish an RFC for the function when I have more time.

## The CDT storage

There are different ways we can build storage based on the `CDT0` function. The `blockset` stores parts as a set of relatively small files located in a `cdt0/` folder. Keeping block parts as files in the `cdt0/` folder storage has its pros and cons, which are outlined below:

### Advantages of the `blockset` storage

- A simple file copy command can synchronize multiple storages. When files in different storages have matching names, they contain identical content, eliminating user dilemmas over potential overwrites.
- The files can be stored statically on [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), and a relatively simple script can download parts and restore a requested data block. Each `blockset` file is
  relatively small (about several kilobytes), so the script can use a simple [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function. There is no need for fancy [P2P](https://en.wikipedia.org/wiki/Peer-to-peer) network protocols, nodes, and custom servers.

### Disadvantages of the `blockset` storage

- As mentioned before, the `blockset` maintains many small files. Keeping a lot of small files is not space-efficient.
- Each `blockset` file represents only one hash. However, the CDT hash function offers a superior better resolution. This higher resolution can increase the likelihood of detecting identical parts within data blocks.

There are multiple solutions to how these problems can be solved. We can use multiple different internal storage formats and synchronize multiple storages using different protocols as long as we use the same CDT function.

## Installation of `blockset`

The `blockset` can be installed on any computer and platform that supports Rust. To install Rust, see [this page](https://www.rust-lang.org/tools/install).

Installing the `blockset`:

```console
cargo install blockset
```

Uninstalling the `blockset`:
```console
cargo uninstall blockset
```

## Commands

Address validation: 
```console
blockset validate 3v1d4j94scaseqgcyzr0ha5dxa9rx6ppnfbndck971ack
```

Calculate address: 
```console
blockset address ./README.md
```
Add to the local storage `cdt0/`: 
```console
blockset add ./LICENSE
```
Get a file by address: 
```console
blockset get ngd7zembwj6f2tsh4gyxrcyx26h221e3f2wdgfbtq87nd ./old.md
```

## Internals

The `blockset` is an open-source project under GPL-3 license. You can find its source code [here](https://github.com/datablockset/blockset). The project is written in Rust, and we've made a deliberate choice to minimize the use of macros. This enhances code readability and reduces hidden control flows, ensuring a more transparent and developer-friendly experience. Currently, the `blockset` code has no third-party dependencies. All source files except `main.rs` don't use I/O directly, which allows us to achieve and maintain 100% code coverage. 

Don't hesitate to contact me if you would like to know more, would like to build on either `CDT0` or `blockset`, or need another license:
- [LinkedIn](https://www.linkedin.com/in/sergeyshandar/),
- [Mastodon](https://techhub.social/@functionalscript),
- [GitHub](https://github.com/sergey-shandar).
