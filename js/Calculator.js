var cashRegister = (function () {
    var currentBalance = 0;
    //denomination list of currencies bills
    var denominationsBills = [{
        qty: 0,
        type: 'One Hundred',
        value: 100
    }, {
        qty: 0,
        type: 'Twenty',
        value: 20
    }, {
        qty: 0,
        type: 'Ten',
        value: 10
    }, {
        qty: 0,
        type: 'Five',
        value: 5
    }, {
        qty: 0,
        type: 'One',
        value: 1
    }, {
        qty: 0,
        type: 'Quarter',
        value: 0.25
    }, {
        qty: 0,
        type: 'Dime',
        value: 0.10
    }, {
        qty: 0,
        type: 'Nickel',
        value: 0.05
    }, {
        qty: 0,
        type: 'Penny',
        value: 0.01
    }];

    //initialization of the cashflow
    var cashFlow = {
        total: 0,
        sells: 0
    };

    //return denomination bills value
    var getDenominationBills = function () {
        return denominationsBills;
    };


    var processChange = function (change, i) {
        i = i || 0;
        //validates the different amounts of bills
        if (denominationsBills[i].qty > 0) {
            var remain = getRemainValue(change, denominationsBills[i].value);

            //calculate the change due
            var changeDue = parseFloat(change - remain).toFixed(2);

            //quantity of bills used
            var qtyBills = changeDue / denominationsBills[i].value;

            //if there are bills on that amount
            if (qtyBills <= denominationsBills[i].qty) {
                denominationsBills[i].qty = denominationsBills[i].qty - (qtyBills);
                changeDue = changeDue - (denominationsBills[i].value * qtyBills);

            } else {

                //
                for (var j = 0; j < denominationsBills[j].qty; j++) {
                    denominationsBills[j].qty--;
                    qtyBills--;
                    changeDue = changeDue - denominationsBills[j].value;
                }
            }

            if (remain > 0) {
                //if there's remain change then call itself to reduce the amount of bills
                processChange(changeDue + remain, i + 1);
            }

        }
    };

    var getRemainValue = function (changeDue, billValue) {
        if (billValue > 0.01) {
            return parseFloat(changeDue % billValue).toFixed(2);
        } else {
            return Math.trunc((changeDue % billValue) * 100) / 100;
        }
    };

    var getChangeDue = function (cash, price) {
        var changeDue = parseFloat(cash - price).toFixed(2);
        processChange(changeDue);
        return changeDue;
    };

    //validates if it's a valid payment
    var isValidPayment = function (price, cash) {
        var changeDue = parseFloat(cash - price).toFixed(2);
        var validObj = {
            isValid: true,
            message: ''
        };
        //if change is less than price
        if (changeDue < 0) {
            validObj.isValid = false;
            validObj.message = 'Not enough cash';
        }
        //add message if there's not enough change and it's more than the current balance
        if (changeDue > currentBalance) {
            validObj.isValid = false;
            validObj.message = 'Insufficient cash in balance for change due';
        }
        return validObj;
    };

    //randomize the qty of bills in cash
    function randomizeCashQty() {
        var total = 0;
        for (var i = 0, len = denominationsBills.length; i < len; i++) {
            var bill = denominationsBills[i];
            //randomize the qty of bills
            bill.qty = Math.floor(Math.random() * 6) + 1;
            total = parseFloat(total + (bill.value * bill.qty));
        }
        return total;
    }

    //init method
    function initialize() {
        currentBalance = randomizeCashQty();
    }

    //main function of payment
    function payment(price, cash) {
        var validatePayment = isValidPayment(price, cash);
        if (!validatePayment.isValid) {
            return {
                message: validatePayment.message
            }
        }


        var changeDue = getChangeDue(cash, price);
        cashFlow.sells = parseFloat(price);
        cashFlow.total = parseFloat(cashFlow.total + cash - changeDue);


        return {
            changeDue: changeDue
        };
    }

    function generateSquare() {
        return {
            currentBalance: getCurrentBalance(),
            sells: cashFlow.sells,
            total: getCurrentBalance() + cashFlow.sells
        }
    }

    function getCurrentBalance() {
        return currentBalance;
    }

    return {
        initialize: initialize,
        generateSquare: generateSquare,
        payment: payment,
        getDenominationBills: getDenominationBills,
        getCurrentBalance: getCurrentBalance

    }
})();





