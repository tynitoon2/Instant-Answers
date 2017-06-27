/**
 * This is your main script file. Please refer to the documentation for more information.
 */

var IARuntime = function() {
    function Base_conversion (iaData) {

    }

    /**
     * runs at runtime
     */
    Base_conversion.prototype.run = function() {
        this.convert();
    };

    /**
     * runs upon exit
     */
    Base_conversion.prototype.stop = function() {

    };

    Base_conversion.prototype.convert = function() {

        function base(id, base) {
            document.getElementById(id).value = base;
        }

        function checkError() {
            var from = document.getElementById("from").value;
            var to = document.getElementById("to").value;
            var res = document.getElementById("number").value;
            var i;
            var j;
            if (from.length === 0 || to.length === 0) {
                document.getElementById("result").innerHTML = "A base is empty"
                return (1);
            }
            for (i = 0; i < from.length; ++i) {
                for (j = i + 1; j < from.length; ++j) {
                    if (from.charAt(i) === from.charAt(j)) {
                        document.getElementById("result").innerHTML = "A base is invalid"
                        return (1);
                    }
                }
            }
            for (i = 0; i < to.length; ++i) {
                for (j = i + 1; j < to.length; ++j) {
                    if (to.charAt(i) === to.charAt(j)) {
                        document.getElementById("result").innerHTML = "A base is invalid"
                        return (1);
                    }
                }
            }
            var isIn;
            for (i = 0; i < res.length; ++i) {
                isIn = false;
                for (j = 0; j < from.length; ++j) {
                    if (res.charAt(i) === from.charAt(j)) {
                        isIn = true;
                    }
                }
                if (!isIn) {
                    document.getElementById("result").innerHTML = "Number doesn't match with base"
                    return (1);
                }
            }
            return (0);
        }

        function convert() {
            var from = document.getElementById("from").value;
            var to = document.getElementById("to").value;
            var res = document.getElementById("number").value;
            var i = 0;
            var j = 0;
            if (checkError() === 1) {
                return;
            }
            if (from !== "0123456789") {
            }
        }

        document.getElementById("fbinary").onclick = function() { base("from", "01"); };
        document.getElementById("foctal").onclick = function() { base("from", "012345678"); };
        document.getElementById("fhexa").onclick = function() { base("from", "0123456789ABCDEF"); };
        document.getElementById("tbinary").onclick = function() { base("to", "01"); };
        document.getElementById("toctal").onclick = function() { base("to", "012345678"); };
        document.getElementById("thexa").onclick = function() { base("to", "0123456789ABCDEF"); };
        document.getElementById("start").onclick = function() { convert(); };
    };

    return Base_conversion;
}();