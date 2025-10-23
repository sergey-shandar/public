current problem:
content ownership. Git and IPFS partly solve the problem of content ownership but not completely. digital signatures, licensing and respecting historical data and formats. 

 people use different platforms to connect (emails, SMS, different messengers, centralized social netwowrs, decentralized social networks like Nostr and BlueSky) but because different people use different networks, we are disconnected with our friends, colleges, communities. (fragmentation). Instead of receiving information from people we trust, we receive spam, phishing, and propaganda from mass media. (trust)

## Solution

Content addressing can be used as global addressing. we need to know a hash algorithm (for example SHA256) and the content hash. we can request different protocols (not necessary Internet based) and when we receive an answer we can validate if it's correct. If we store information in our own local CAS, we can save, deduplicate and backup the information.

graph: content and it's hash

Because the same content has the same address in such system, we can effectively synchronize two storages as mathematical sets. 

diagram.

When we add new information to one storage, in the worst case, we can compare a list of hashes from another one and synchronize only missing hashes. However, we can do even more optimal than that if we compare hashes of lists or parts of the list. Other optimization may include time and block relation.

Content addresses works very well if we would like to reference immutable content. But what if we would like find the newest version of the content. We can define a newer revision of a content as a content which references the old one using the content address.

graph: rev0 <- rev1 <- rev2

It is a chain of block of data. Right, blockchain  has the name because it's formed from a directional chain of blocks. Each block references a previous block using their hashes.

However, the problem is that different people could create different versions of the content

graph: rev0 <- rev1a <- rev2ab
            <- rev1b <-
            <- rev1c <- rev2c

Computationally improbable to create a cycle if we have a strong, not compromised hash function.

Identity, public-private key gives as digital signatures

