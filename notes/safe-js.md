# Why we must have a safe subset of JavaScript

We have hundreds of programming languages and even more compilers and build systems for these languages. Some of them are quite unsafe, and it is very difficult to prove that the code doesn't have unintentional bugs or intentional back-doors. Because of this, we periodically detect these problems that are already in production.

- **By "design"**: log4j.
- **Supply chain attacks:** Solana JavaScript.

This kind of attack can lead to huge economic losses for individuals, organizations, and even countries.

It's almost impossible to eliminate these attacks completely, but we can significantly reduce the risks of such attacks. There are examples of purely functional languages that can decrease such risks. But here's the problem: these programming languages are not widely adopted. There are several reasons why

- main platforms, such as web browsers, mobile phones, and operating systems, don't support the safe FP out-of-the-box and may require additional build steps and module incompatibilities that reduce code reusability.
- we don't have enough software engineers who are familiar with these languages and FP concepts.

## Why PFP is more secure 

While different virtualization methods can protect a program from malicious code, PFP provides additional protection and isolation on the function level. FunctionalScript guarantees that any function you call may have only these two side effects: 
- crash the program by either throwing an exception or trying to allocate too much memory,
- never return, run forever.
However, it can't have direct access to I/O interfaces unless we explicitly pass the interfaces to the function. Of course, it may access it indirectly if your program has some other flaws. For example, ...
Also, the behavior of the function is deterministic, it means, if once it has one behavior, then it will always have this behavior. Currently, a malicious module can behave differently in test and production environment.

## Package Management And Supply Chain Attacks

When we use third-party libraries, there is always a risk of supply chain attacks. From another point of view, writing everything from scratch has its own risks, including security. This is especially true now when companies use AI-generated code that is very expensive to validate. Code reuse is very low in such systems. It's very expensive and unsafe to write code from scratch without reusing existing packages or validating AI-generated code. 

CA validation works well for referencing immutable code, but it doesn't work very well for updates and security patches. The solution is digital signatures when we only use a new package when it's signed by authors and other trusted parties, e.g. code reviewers.  

I think the way forward is to use third-party packages and AI that helps to find modules with existing algorithms instead of rewriting the same algorithms again and again.

## CA package management systems 

Content-addressable systems can reduce risks by locking tested third packages to specific hashes. 

The next step is to have CA verification on the code level. Content-addressable programming languages like Unison are much more secure and can detect code altering much more easily.

## Reality

Reality is far away from ideal. We don't use FP languages; we don't use CA infrastructure and cryptographic proofs. The most popular programming language is JavaScript, and because JavaScript is the assembly language for the Web, it will not be replaced by other programming systems in the near future. So, how can we increase the security of our systems without rebuilding all platforms and re-educating software engineers? 

## FunctionalScript

FunctionalScript is a safe, purely functional subset of JavaScript.

Safe means that third-party code can only have a limited impact and has limited access to I/O, only I/O that was provided by a caller of the function. If a function requires an IO interface, a program can always create a special virtual IO interface, which either has no connection to real I/O or monitors and filters I/O requests. The only known possible side effects are

- the function can panic and stop the program by either consuming too much memory or throwing an exception
- never return, run infinitely long.

This possibility also allows us to test all functions and create virtual scenarios that are hard to reproduce with real I/O. 

We've done research on how we can build such a subset that if JavaScript code belongs to the subset, then it's safe code. We call this subset FunctionalScript. Any JavaScript code can use the FunctionalScript code, but the FunctionalScript code can only reference other FunctionalScript codes. 

Isolation of IO makes the FunctionalScript not only safe but also much more cross-platform and scalable. Including usage in distributed and decentralized applications.

We are working on a parser and a family of VMs. One of the VM will be content-addressable.

------------------

The short answer: **safety and security**.

With ESM importing using HTTPS, development should be simplified, so you don't need to worry about package managers, etc. However, there's a problem.
Major package managers, such as NPM and JSR, don't support it.

## What do we download?

If we use a module in our software, we have two main options:

1. package manager:
  - use it as an NPM/JSR package and then make a bundle.
  - copy the module locally and then deploy it (and all dependencies) with everything else, so it's still a kind of bundle.
2. reference on a third-party HTTPS.

The second option benefits internet infrastructure because browsers don't need to download the same packages repeatedly. It could be even better if `import` supported content-addressable links, but this is a big topic for another article. For example, when we deploy content-addressable links, they have to be verified.

1. An author of the script can have malicious code.
2. An author or anyone who has access to the server may replace originally good code with malicious.

As mentioned before, CA and digital signatures can reduce the risk. However, there is still a risk that even signed and content-proof codes may contain security holes that we missed during our software development cycle.

## Safe subset

The safe subset of JavaScript doesn't have side effects and must be validated that it doesn't have them before running. Of course, it doesn't guarantee that the code can't have security issues, but it can significantly reduce risk and eliminate the whole class of attacks and bugs.

## Virtualization and Isolation

Removing direct access to I/O from a language also allows much better virtualization of code, when we can call any function and provide  
That alone allows much better testing and mocking of scenarios, which is almost impossible with a program with direct access to I/O. We can also achieve 100% code coverage.
- We can also add extra layers of protection, such as a firewall inside our code.
And it's possible to do it inside the PL code without complex out-of-proc virtualization.

## Internal Safety




## Code Portability

Often, code that relies on direct I/O is much harder to port when our I/O system is changed. There could be different reasons why it's changed like the system is changed or we would like to use the same code on another system.

## Typing

FunctionalScript allows building a much safer version of the structural type system and better type inference than TypeScript.

## Hack Examples

https://www.bleepingcomputer.com/news/security/solana-web3js-library-backdoored-to-steal-secret-private-keys/

## Conclusion

I don't describe anything new in the article especially for people who already use purely functional languages. But the problem is that these languages don't have wide adoption, not compatible with such popular environments like JavaScript and require complex build systems. While I like TypeScript, transpiling it to JavaScript is very painful. There are other purely functional languages that can transpile the logic to JavaScript but then again it is very hard to produce a library or framework on these languages that can be used in JavaScript applications. FunctionalScript code can be used by any JavaScript code without additional transformations. Assuming the code is modern ECMAScript standard with modules.

So, if we would like to have good security and still use third-party modules (even through HTTPS), we should do this:

1. content-addressable infrastructure:
    1. digital signature from multiple authors, reviewers, automated build tools, etc.
    2. hash lock and content proof when deployed.
2. a safe subset of JavaScript, no side effects, no direct access to I/O.
