# Designing Network Protocol for CAS

## Internal Blockset Structure

Every repository can have multiple trees. Sometimes, we call the repository a forest. Every block of data is represented by one tree of hashes.

In reality, trees may share some nodes, so this set of trees is a DAG. Shared nodes mean that one or multiple data blocks share some data and don't need to keep the information twice. This is the main mechanism by which Blockset saves storage.

Every node is about several kilobytes and represents either data or a list of hashes.

```mermaid
graph TD;
    subgraph Root
      A
      B
      ...Z
    end
    subgraph AX[A]
      AA
      AB
      ...AZ
    end
    subgraph BX[B]
      BA
      BB
      ...BZ
    end
    A-->AX
    B-->BX
    AA-->AAD[AA Data]
    AB-->ABD[AB Data]
    BA-->BAD[BA Data]
    BB-->BBD[BB Data]
```

## Streaming

- less local memory
- more traffic

Requests: 
```
- AA, AB, ...AZ,
- BA, BB, ...BZ,
- ...
- A, B, ...Z,
- Root
```

Each request sends one hash to a remote server, asking if it exists. If the server responds with the answer no, then the client sends a corresponding data block to the server.

In the worst case, if the server always answers `no,` we send slightly more information to the server than the original file. 
In the best case, if the server always answers `yes`, we send only a small set of hashes and no data.

## Synchronizing Two Blocksets

- more local storage
- less traffic

Requests: 

```
- Root
  - A
    - AA
    - AB
    - ...
  - B,
    - BA
    - BB
    - ...
  - ...
```

In the worst case, if the server always answers `no,` we send slightly more information to the server than the original file. 
In the best case, if the server always answers `yes`, we send only one `Root` hash.

## Hybrid Solution


