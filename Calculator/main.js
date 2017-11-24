$(document).ready(function () {

    var primaryInput = $('#primary-input');
    var secondaryInput = $('#secondary-input');

    var primaryText = '0';
    var secondaryText;
    var num1 = 0;
    var num2 = 0;
    var recentlyEvaluated = false;
    var operator = undefined;
    var operatorSymbol = '';

    $('.touchable').on('click', function () {
        var target = $(this).children('.button').text();

        switch (target) {
            case "AC":
                primaryText = '0';
                num1 = 0;
                num2 = 0;
                operator = undefined;
                operatorSymbol = '';
                break;
            case "+/-":
                if (operator === undefined) {
                    // Number 1 in play
                    num1 *= -1;
                } else {
                    // Number 2 it is
                    num2 *= -1;
                }
                break;
            case "%":
            case "÷":
            case "×":
            case "-":
            case "+":
                operate(target);
                break;
            case ".":
                if (operator === undefined) {
                    // Number 1 in play
                    num1 += 0.0;
                } else {
                    // Number 2 it is
                    num2 += 0.0;
                }
                break;
            case "=":
                evaluate();
                break;
            default:
                if (operator === undefined) {
                    // Number 1 in play
                    num1 = Number(primaryText) * 10 + Number(target);
                    console.log('Num1 in play' + num1);
                    primaryText = String(num1);
                } else {
                    // Number 2 it is
                    num2 = Number(primaryText) * 10 + Number(target);
                    console.log('Num2 in play' + num2);
                    primaryText = String(num2);
                }
        }
        updateUI();
    });

    var updateUI = function () {
        console.log('num1 ' + num1);
        console.log('oper ' + operator);
        console.log('num2 ' + num2);

        primaryText = operator === undefined ? String(num1) : String(num2);

        if (recentlyEvaluated) {
            secondaryText = secondaryInput.text();
            recentlyEvaluated = false;
        } else
            secondaryText =
                [String(num1),
                    operatorSymbol,
                    num2 === 0 ? '' : (num2 < 0 ? ['(', String(num2), ')'].join('') : String(num2))].join('');

        console.log('primary :' + primaryText);
        console.log('secondary :' + secondaryText);

        primaryInput.text(primaryText);
        secondaryInput.text(secondaryText);
        console.log('------');
    };

    var operate = function (target) {

        if (operator !== undefined && num2 !== 0) {
            num1 = eval(secondaryText.replace(operatorSymbol, operator));
            num2 = 0;
        }

        operatorSymbol = target;
        if (operatorSymbol === '×')
            operator = '*';
        else if (operatorSymbol === '÷')
            operator = '/';
        else
            operator = operatorSymbol;
        primaryText = '0';

        console.log('operator in play :' + operatorSymbol);
    };

    var evaluate = function () {
        console.log("Evaluating...");
        var expr = secondaryText.replace(operatorSymbol, operator);

        num1 = eval(expr);
        operator = undefined;
        operatorSymbol = '';
        num2 = 0;
        recentlyEvaluated = true;
    };

    updateUI();

});