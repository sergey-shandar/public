# What's wrong with fediverse?

What's wrong with fediverse social networks like Mastodon? Of course, it's a huge step forward away from centralized social networks but is it enough?

Firstly, the identity and data still don't belong to users.
Second, content identification is not based on strong cryptographic hashes, so duplication is possible.

Consequences:
- it's not compatible with other social networks and can be fragmented if some users prefer different networks. To follow them we will still need to have multiple accounts in different networks, like in Bluesky and Mastodon.
- if servers are going offline, you lose everything, all your data, including contacts

`Nostr` is better because it uses decentralized identity, but it doesn't have a concept of a content repository, like Git in software development. 

To fix the problems, we are developing CAS (content-addressable storage) for content creators that can be synchronized using any protocol.
