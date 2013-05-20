var duplexer = require('duplexer');

module.exports = function (a, b) {
    a.pipe(through(
        function (buf) { b.write(buf) },
        function () { b.end() }
    ));
    var dup = duplexer(a, b);
    dup.on('pause', function () {
        b.pause();
    });
    dup.on('resume', function () {
        b.resume();
    });
    return dup;
};
