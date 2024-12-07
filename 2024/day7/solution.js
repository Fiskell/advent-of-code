const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const c = (parts) => {
  // console.log(parts);
  let ret = parseInt(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    // console.log(i, ret, parts[i], parts[i + 1]);
    if (parts[i] === '||') {
      ret = parseInt(ret.toString() + parts[i + 1].toString());
    } else if (parts[i] === '+') {
      ret += parseInt(parts[i + 1]);
    } else {
      ret *= parseInt(parts[i + 1]);
    }
  }
  return ret;
};

const solution_part1 = (input) => {
  const rows = input.split('\n');
  let ret = 0;
  const operations = ['*', '+'];
  rows.forEach((row) => {
    console.log('row', row);
    const lr = row.split(':');
    const total = lr[0];
    const parts = lr[1].trim().split(' ');

    // const valid = solveEquation(solution, parts, operations)

    // get binary representation of the number of operations
    for (let i = 0; i < Math.pow(2, parts.length - 1); i++) {
      let tot = 0;
      const binary = i
        .toString(2)
        .padStart(parts.length - 1, '0')
        .split('');
      const eq = [];
      for (let j = 0; j < parts.length; j++) {
        eq.push(parts[j]);
        if (j < parts.length - 1) {
          eq.push(operations[parseInt(binary[j])]);
        }
      }
      // const eqRun = eval(eq.join(''));
      const eqRun = c(eq);
      if (eqRun === parseInt(total)) {
        console.log('valid', eqRun);
        ret += eqRun;
        break;
      }
    }
  });
  return ret;
};

const solution_part2 = (input) => {
  const rows = input.split('\n');
  let ret = 0;
  const operations = ['*', '+', '||'];
  rows.forEach((row) => {
    console.log('row', row);
    const lr = row.split(':');
    const total = lr[0];
    const parts = lr[1].trim().split(' ');

    // const valid = solveEquation(solution, parts, operations)

    // get binary representation of the number of operations

    for (let i = 0; i < Math.pow(3, parts.length - 1); i++) {
      // console.log(i);
      let tot = 0;
      const binary = i
        .toString(3)
        .padStart(parts.length - 1, '0')
        .split('');
      const eq = [];
      for (let j = 0; j < parts.length; j++) {
        eq.push(parts[j]);
        if (j < parts.length - 1) {
          eq.push(operations[parseInt(binary[j])]);
        }
      }
      //compress any || first
      // while (eq.includes('||')) {
      //   for (let j = 0; j < eq.length; j++) {
      //     if (eq[j] === '||') {
      //       eq[j - 1] = eq[j - 1] + eq[j + 1];
      //       eq.splice(j, 2);
      //     }
      //   }
      // }
      const eqRun = c(eq);
      // console.log(total, eqRun, eq);
      if (eqRun === parseInt(total)) {
        console.log('valid', eqRun);
        ret += eqRun;
        break;
      }
    }
  });
  return ret;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.log('Part 2 Answer: ', solution_part2(input2));
