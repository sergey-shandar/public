# Data Vendor Lock-In and Web3

## What is the biggest problem with Web2?

Most would say the biggest problem with Web2 is centralization. For example, we host our data using central services, like Web2 social networks, 
Web2 cloud providers, Web2 email providers, and others. We don’t have much control over our data using Web2 services. At any time, the service 
can refuse access to all or part of our data. People are 
[tired of switching platforms and losing their data](https://zulie.medium.com/what-youre-feeling-is-platform-fatigue-or-why-i-m-not-joining-threads-1e188369d25d).

## Does Web3 solve the problem of Web2?

According to [Wikipedia](https://en.wikipedia.org/wiki/Web3), one of the main properties of Web3 is decentralization. 
There have been multiple attempts to provide decentralized services. For example,

- social networks and messengers: [Mastodon](https://en.wikipedia.org/wiki/Mastodon_(social_network)), [Matrix](https://en.wikipedia.org/wiki/Matrix_(protocol));
- cloud providers, like [IPFS](https://en.wikipedia.org/wiki/InterPlanetary_File_System);
- finances: [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin), [Ethereum](https://en.wikipedia.org/wiki/Ethereum);
- and source control systems: [Git](https://en.wikipedia.org/wiki/Git), [Mercurial](https://en.wikipedia.org/wiki/Mercurial).

However, these services don't really solve the fundamental problem that a user's data should belong to the user. Even if it is decentralized, we need 
different applications or services to access and store our data. Some decentralized services (like blockchain) might shut down or change their protocol, 
and we will most likely lose access to our data again. It could also be hard to reference the data from a new storage. On top of that, storing data in 
a blockchain could be pretty expensive. I don't want to pay for every message that I send to a friend.

Another problem with Web3 technologies, like blockchain, is that they are not designed for sub-networks. For example, often, a blockchain doesn't allow forking. 
How will it work if we would like to run the same internet on another planet while only having occasional synchronization? For example, a signal to Mars takes 
from 5 to 20 minutes. I know we are probably far away from this, but there can still be other examples of isolated sub-networks that need to be synchronized 
occasionally.

So, instead of centralized data vendor lock-in, we now have decentralized data vendor lock-in. It's better but doesn't completely solve the problem at hand 
and it's not future-proof.

## What's a solution?

I think the solution is to switch our focus from protocols (how we access the data) to focusing on the structure of data and data formats.

Let's say I create some information, like a block of data. It can be an article, an image, a short text message, a document, or something else. 
Imagine we have a storage that keeps such blocks. Then, how can we uniquely identify the blocks and avoid duplications in the storage? 
Well, there is a family of functions/algorithms that can produce a unique identifier for any data block; they are called 
[cryptographic hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function). 
For example: [SHA2](https://en.wikipedia.org/wiki/SHA-2), and [SHA3](https://en.wikipedia.org/wiki/SHA-3). 
This family of functions is already used by many decentralized systems. A storage that keeps data blocks and accesses 
them by a hash function is called a [hash table](https://en.wikipedia.org/wiki/Hash_table).

Note: A block of data is not a file. A file has additional information, such as a name and a file extension. A name of a file doesn't uniquely 
identify the data it holds. You may have multiple files with different names/paths that hold the same data.

## Data synchronization

If we keep our data in multiple file storages, we may face synchronization problems. Have you seen that message that repeats when you 
try to synchronize your files to a cloud file storage? "File already exists, do you want to replace it?". 
Honestly, the message freaks me out. I have no idea what I should answer. I just don't want to lose my data and avoid duplications.
However, if we keep our data in a big hash table, it's not a big deal to compare two hash tables and synchronize them. 
There are no merge conflicts, no prompts, no data loss, and no duplications.

## What happens if our hash algorithm is compromised?

In this case, we would freeze all our data, which is using the old hash algorithm, and make a kind of immutable registry of allowed/known hashes. 
This means we can't add new data using the old hash algorithm, but we can access it. For new data blocks, we can use a new hash algorithm that is not 
compromised yet.

For example, we have a [SHA1](https://en.wikipedia.org/wiki/SHA-1#SHAttered_%E2%80%93_first_public_collision) hash table:

| hash    | value |
|---------|-------|
| sha1(A) | A     |
| sha1(B) | B     |

After we find that the SHA1 is compromised, we create two new tables.
The first table is an immutable mapping from SHA1 to SHA256. No new blocks can be added to this table.

| hash    | value     |
|---------|-----------|
| sha1(A) | sha256(A) |
| sha1(B) | sha256(B) |

The second table is a new table with SHA256. We can add new blocks to this table.

| hash      | value |
|-----------|-------|
| sha256(A) | A     |
| sha256(B) | B     |
| sha256(C) | C     |
