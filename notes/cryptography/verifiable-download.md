# Veriafable Download

One of the good properties of cryptographically strong hash is that a known hash value can be used to verify that the content we download from the Internet matches the original file's content. But here's the problem: we need to download the whole file to ensure the content of the file is correct. It's not a big deal if the file is only a few kilobytes, but it can be really bad if the file is huge, e.g., several gigabytes. 

## Merkle Tree

One of the solutions is to use Merkle Tree. Then, we can start downloading nodes from the root and verify the content against hashes that we already know.
