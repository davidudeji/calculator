const stack: string[] = [];
let queue: (number | string)[] = [];
let numStack: number[] = [];
type Operator = "+" | "-" | "*" | "/";

const operatorPrecedence: Record<Operator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};


export function shuntingYardAlgorithm(input: string[]) {
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isNumber = !Number.isNaN(Number(char));

    if (isNumber) {
  queue.push(Number(char));
} else {
  const currentOp = char as Operator;

  while (
    stack.length &&
    operatorPrecedence[stack[stack.length - 1] as Operator] >=
      operatorPrecedence[currentOp]
  ) {
    queue.push(stack.pop()!);
  }

  stack.push(currentOp);
}


  // Part: doing the actual calculation
  for (let i = 0; i < queue.length; i++) {
    const char:any = queue[i];

    const isNumber = !Number.isNaN(Number(char));

    if (isNumber) {
      numStack.push(char);
    } else {
      const right = numStack.pop()!; // 5
      const left = numStack.pop()!; // 4

      if (left && right) {
        if (char === "+") {
          const result = add(left, right);
          numStack.push(result);
        } else if (char === "-") {
          const result = left - right;
          numStack.push(result);
        } else if (char === "/") {
          const result = left / right;
          numStack.push(result);
        } else if (char === "*") {
          const result = left * right;
          numStack.push(result);
        }
      }
    }
  }

  const result = numStack[0];
  queue = [];
  numStack = [];

  return result;
}

function add(a: number, b: number): number {
  return a + b;
}}
