I'm a developer and use multiple languages and frameworks. Most of them use some kind of configuration files. For example MSBuild ('.vcproj'), CMake, Node.js (project.json), TypeScript (tsconfig.json) etc. 

## A little bit of history

A long time ago, XML was the first candidate for configuration, communication, small databases, and DSLs. 

Then, the industry mostly switched to JSON. JSON uses a small subset of JavaScript basic types and syntax. Because of this, using JSON is much easier than XML, at least for me. I always know how the JSON data is [de]serialized since it maps to JavaScript one-to-one. Usually, it's not a problem for other languages as well. Most modern languages have JSON types: number, string, boolean, array, dictionary, and null. Currently, JSON is a defacto standard for communication between computers; for example, REST API uses it as a default data format.

Of course people would like to simplify even further and now we have a zoo of different formats, such as YAML, TOML, GraphQL etc. These format could be easier to read for people who already learn them, otherwise, it may look like black magic. Most of them are trying to simplify syntax but still keep the same JSON data types.

Note: in parallel, there is another family of data formats based on LISP syntax called S-exp. For example, WebAssemmbly uses it. They are cool but not very popular.

## Problems

Problems with current formats:
- references to other objects for reusing common parts,
- references to objects in other files,

Because these formats don't solve the problem (including new fancy syntax sugar formats, like JSON5), people are creating their own eDSL on top of these formats. For example:
- JSON schema and REST API: ...
- MSBuild
- Cargo.toml

This approach requires special processing before serialization and after deserialization. And because we don't have a standard for resolving references we have to create new libraries for pre-post processing for each new eDSL.

diagram

## Different Approach

As mentioned before, JSON is based on JavaScript. Why we don't use other (well known, standard) features of JavaScript to solve the problem? For example, JavaScript already have a mechanism to create and reference names objects.

code

In fact, some framework already use JavaScript as configuration files. However, this could be dangerous, non-deterministic and with all sorts of side-effects because JavaScript is turning complete and has access to all sorts of IO.

## DataScript or DJS

To avoid these security problems we can use only a subset of JavaScript. Such subsets already in development, for example FunctionalScript.

FunctionalScript is good, but currently, JavaScript and its engines don't support function serialization. Writing a serializer using the current ECMAScript is a big challenge, so we developed a subset of ECMAScript that has no functions.




