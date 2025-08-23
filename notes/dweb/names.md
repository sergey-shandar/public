# Global Naming 

- [RFC 6920: Naming Things with Hashes](https://www.rfc-editor.org/rfc/rfc6920.html).
- [IPFS CID](https://docs.ipfs.tech/concepts/content-addressing/)

## Proposal for global addressing

It's similar to POSIX names, considering all digital space as one global computer. Examples:

- `/sha2-cr0ckf0rdsbase32` absolute path to immutable data. This is also a result of name resolution from available data.
- `/sha2-cr0ckf0rdsbase32/path/to/a` absolute path to data.
- `/secp256k1-cr0ckf0rdbase32/` absolute path to a user.
- `/secp256k1-cr0ckf0rdbase32/path/to/b` absolute path to data.
- `/secp256k1-cr0ckf0rdbase32/friend-name/path/to/b` absolute path to friend's data.
- `/secp256k1-cr0ckf0rdbase32/friend-name/path/to/b` absolute path to friend's data.
- `~/friend-name/path/to/c` relative path to friend's data.

When using a path, we need to parse data blocks. If it's recognizable as something with a path (e.g., JSON, Git Directory Block), we can then point to the data.

We will need to have signed snapshots sometimes, which will collapse  

## CRDT

CRDT is a set of changes to the document.
