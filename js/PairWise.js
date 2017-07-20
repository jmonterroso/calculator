var pairWise = (function PairWise() {
    function getPairs(items, value) {
        var arr = [];
        //iterates over items and compare agains next
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            for (var j = i + 1; j < items.length; j++) {
                // Checks that the values sum up and that
                // the element index haven't been used
                var next = items[j];
                if ((item + next) === value && arr.indexOf(i) === -1) {
                    // Push into array and break
                    arr.push(i, j);
                    break;
                }
            }
        }
        console.log(arr, 'arr '); //deleteinbuild
        if (arr.length >= 1) {
            // Reduce the array to get the total sum
            return arr.reduce(function (sum, value) {
                return parseInt(sum, 10) + parseInt(value, 10);
            });
        }
        return 0;
    }

    return {getPairs: getPairs};
})();

var arr = [7, 9, 11, 13, 15];
var value = 20;
var indexSum = pairWise.getPairs(arr, value);