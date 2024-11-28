# Why we must have a safe subset of JavaScript

With ESM importing using HTTPS should simplify development, so you don't need to care about package managers etc. However, here's a problem.
Major package managers, such as NPM and JSR, don't support it.

## What do we download?

If we use a module in our software, we have 2 main options:

1. package manager:
  - use it as a NPM/JSR package and then make a bundle.
  - copy the module locale and then deploy it (and all dependencies) together with everything else, so it's still a kind of bundle.
2. reference on a third-party HTTPS.

The second option has a benefits for internet infrastructure because browsers don't need to download the same packages again and again. It could be even better if `import` support content-addressable links but this is a subject to another bigger discussion. For example, when we deploy a content-addressable links and has to be verified.

1. An author of the script can have a malicious code.
2. An author or anyone who has an access to the server may replace originally good code with malicious.

As mention before, CA and digital-signatures can reduce the risk. But there is still a risk that even signed code and even content-proof code may contain security holes that we missed during our software development cycle.

## Safe subset

The safe subset of the JavaScript doesn't have side-effects and must be validated that it doesn't have them before running. Of course, it doesn't guarantee that the code can't have security issues but it can significantly reduce risk and eliminate the whole class of attacks.

## Conclusion

So, if we would like to have good security and still use third-party modules (even through HTTPS), we should do this:

1. content-addressable infrastructure:
    1. digital signature from multiple authors, reviewers, automated build tools, etc.
    2. hash lock and content-proof when deployed.
2. a safe subset of JavaScript, no side-effects, no direct-access to I/O.
