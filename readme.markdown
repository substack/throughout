# throughout

Apply a through stream to the output side of a through stream.

# example

``` js
var duplexer = require('duplexer');

function applyTransform (filterStream) {
    var output = t
    input.pipe(output);
    var dup = duplexer(input, output);
    return dup;
}
```

# rationale

If you want to transform just the output side of a through stream, this is
actually somewhat difficult and it's not immediately obvious why something like:

``` js
var duplexer = require('duplexer');

function filterOutput (a, b) {
    a.pipe(b);
    return duplexer(a, b);
}
```

shouldn't just work. The worst part is that it *does* work, until you try to
pipe the results to a slow endpoint that will throttle with pause and resume.

The problem is that both `duplexer` and `.pipe()` will handle pause and resume
in a mutually exclusive way that will cause the stream to hang indefinitely if a
slow downstream consumer ever triggers a pause.

# methods

``` js
var throughout = require('throughout');
```

## var c = throughout(a, b)

Pipe the output of a through stream `a` into the input of a through stream `b`,
returning a new stream `c` that writes its input to `a` and forwards the output
from `b`.

# install

With [npm](https://npmjs.org) do:

```
npm install throughout
```

# license

MIT
