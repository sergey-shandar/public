# Why we must have a safe subset of JavaScript

The short answer: **security**.

With ESM importing using HTTPS should simplify development, so you don't need to care about package managers etc. However, here's a problem.
Major package managers, such as NPM and JSR, don't support it.

## What do we download?

If we use a module in our software, we have two main options:

1. package manager:
  - use it as an NPM/JSR package and then make a bundle.
  - copy the module locally and then deploy it (and all dependencies) with everything else, so it's still a kind of bundle.
2. reference on a third-party HTTPS.

The second option benefits internet infrastructure because browsers don't need to download the same packages repeatedly. It could be even better if `import` supported content-addressable links, but this is a subject for another bigger discussion. For example, when we deploy content-addressable links, they have to be verified.

1. An author of the script can have malicious code.
2. An author or anyone who has access to the server may replace originally good code with malicious.

As mentioned before, CA and digital signatures can reduce the risk. However, there is still a risk that even signed and content-proof codes may contain security holes that we missed during our software development cycle.

## Safe subset

The safe subset of JavaScript doesn't have side effects and must be validated that it doesn't have them before running. Of course, it doesn't guarantee that the code can't have security issues, but it can significantly reduce risk and eliminate the whole class of attacks.

## Virtualization and Isolation

Removing direct access to I/O from a language also allows much better virtualization of code, when we can call any function and provide  
That alone allows much better testing and mocking of scenarios, which is almost impossible with a program with direct access to I/O. We can also achieve 100% code coverage.
- We can also add extra layers of protection, such as a firewall inside our code.
And it's possible to do it inside the PL code without complex out-of-proc virtualization.

## Typing

FunctionalScript allows building a much safer version of the structural type system and better type inference than TypeScript.

## Hack Examples

https://www.bleepingcomputer.com/news/security/solana-web3js-library-backdoored-to-steal-secret-private-keys/

## Conclusion

So, if we would like to have good security and still use third-party modules (even through HTTPS), we should do this:

1. content-addressable infrastructure:
    1. digital signature from multiple authors, reviewers, automated build tools, etc.
    2. hash lock and content proof when deployed.
2. a safe subset of JavaScript, no side effects, no direct access to I/O.
