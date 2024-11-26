One of the famous principles is that code is data. However, a lot of PLs don't really follow the principle. In fact, there are only few languages that follows this, and code can be serialized and deserialized.

The first step is usually, use pointer on functions. The second step is to make functions as the first-order citizens (lambda functions). However, these features doesn't guarantee that you can serialized/deserialized functions.

Challenges:
- purely functional,
- normalization.