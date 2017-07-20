var Utils = {};
Utils.dom = Utils.dom || {};
Utils.dom = {
    printSquareValues: function (values) {
        document.querySelector('#squareReportTable').classList.remove('hidden');
        var table = document.querySelector('#squareTable tbody');
        var str = '';
        str += '<tr>';
        str += '<td>$' + values.currentBalance.toFixed(2) + '</td>';
        str += '<td>$' + values.sells.toFixed(2) + '</td>';
        str += '<td>$' + values.total.toFixed(2) + '</td>';
        str += '</tr>';
        table.innerHTML = str;

    },

    printErrorMessage: function (message) {
        var _alert = document.getElementById('alert');
        _alert.innerHTML = message;
        _alert.classList.remove('hidden');
    },
    hideForm: function () {
        document.querySelector('#priceForm').classList.add('hidden');
        document.querySelector('#closedState').classList.remove('hidden');

    },
    printChangeDue: function (changeDue) {
        var _change = document.getElementById('changeDue');
        _change.innerHTML = 'The change Due is: <strong>$' + changeDue + '</strong>';
        _change.classList.remove('hidden');
    },
    hideErrorMessage: function () {
        document.getElementById('alert').classList.add('hidden');
    },
    printBillTable: function () {
        var bills = cashRegister.getDenominationBills();

        var currentBalance = cashRegister.getCurrentBalance();
        var tbody = document.querySelector('#billTable tbody');
        var str = '';
        for (var i = 0, len = bills.length; i < len; i++) {
            str += '<tr>';
            var bill = bills[i];
            str += '<td>' + bill.type + '</td>';
            str += '<td>' + bill.qty + '</td>  ';
            str += '<td>$' + bill.value + '</td>  ';
            str += '<td>$' + parseFloat(bill.value * bill.qty).toFixed(2) + '</td>  ';
            str += '</tr>';
        }
        str += '<tr>' +
            '<td><strong>Total</strong></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td>$' + currentBalance.toFixed(2) + '</td>' +
            '</tr>';
        tbody.innerHTML = str;
    },
    events: function () {
        document.getElementById('priceForm').addEventListener('submit', function (e) {
            e.preventDefault();
            var price = document.getElementById('price');
            var cash = document.getElementById('cash');
            var payment = cashRegister.payment(price.value, cash.value);
            if (payment.message) {
                Utils.dom.printErrorMessage(payment.message);
            } else {
                Utils.dom.hideErrorMessage();
                Utils.dom.printChangeDue(payment.changeDue);
                Utils.dom.printBillTable();
                Utils.dom.hideForm();
            }
        });
        document.getElementById('printSquare').addEventListener('click', function (e) {
            e.preventDefault();
            Utils.dom.printSquareValues(cashRegister.generateSquare());
        });
    }


};


