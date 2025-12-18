"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuntingYardAlgorithm = shuntingYardAlgorithm;
var stack = [];
var queue = [];
var numStack = [];
var operatorPrecedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
};
function shuntingYardAlgorithm(input) {
    for (var i = 0; i < input.length; i++) {
        var char = input[i];
        var isNumber = !Number.isNaN(Number(char));
        if (isNumber) {
            queue.push(Number(char));
        }
        else {
            while (stack.length &&
                Object.values(operatorPrecedence).length - 1 >= Object.values(operatorPrecedence)[char]) {
                queue.push(stack.pop());
            }
            stack.push(char);
        }
    }
    while (stack.length) {
        queue.push(stack.pop());
    }
    // Part: doing the actual calculation
    for (var i = 0; i < queue.length; i++) {
        var char = queue[i];
        var isNumber = !Number.isNaN(Number(char));
        if (isNumber) {
            numStack.push(char);
        }
        else {
            var right = numStack.pop(); // 5
            var left = numStack.pop(); // 4
            if (left && right) {
                if (char === "+") {
                    var result_1 = add(left, right);
                    numStack.push(result_1);
                }
                else if (char === "-") {
                    var result_2 = left - right;
                    numStack.push(result_2);
                }
                else if (char === "/") {
                    var result_3 = left / right;
                    numStack.push(result_3);
                }
                else if (char === "*") {
                    var result_4 = left * right;
                    numStack.push(result_4);
                }
            }
        }
    }
    var result = numStack[0];
    queue = [];
    numStack = [];
    return result;
}
function add(a, b) {
    return a + b;
}
