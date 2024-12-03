const { dir } = require('console');
const fs = require('fs');
const path = require('path');

//xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
//Only the four highlighted sections are real mul instructions. Adding up the result of each instruction produces 161 (2*4 + 5*5 + 11*8 + 8*5).

const solution_part1 = (input) => {
  const regex = /mul\(\d*[0-9],\d*[0-9]\)/g;
  const matches = input.matchAll(regex);
  let total = 0;
  for (const match of matches) {
    console.log(match);
    let trim = match[0].replace('mul(', '').replace(')', '');
    const parts = trim.split(',');
    const left = parseInt(parts[0]);
    const right = parseInt(parts[1]);
    total += left * right;
  }
  return total;
};

const runMul = (cmd) => {
  let trim = cmd.replace('mul(', '').replace(')', '');
  const parts = trim.split(',');
  const left = parseInt(parts[0]);
  const right = parseInt(parts[1]);
  return left * right;
};

const solution_part2 = (input) => {
  const regex = /mul\(\d*[0-9],\d*[0-9]\)/g;
  const do_regex = /do\(\)/g;
  const dont_regex = /don\'t\(\)/g;

  const matches = input.matchAll(regex);
  const do_matches = input.matchAll(do_regex);
  const dont_matches = input.matchAll(dont_regex);

  const instructions = [...matches, ...do_matches, ...dont_matches];
  instructions.sort((a, b) => {
    const aIndex = a['index'];
    const bIndex = b['index'];
    return aIndex - bIndex;
  });

  let mul = true;
  let total = 0;

  instructions.forEach((instruction) => {
    switch (instruction[0]) {
      case 'do()':
        mul = true;
        break;
      case "don't()":
        mul = false;
        break;
      default:
        if (mul) {
          total += runMul(instruction[0]);
        }
    }
  });

  return total;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8')
// console.log('Part 1 Answer: ', solution_part1(input));

const input2 = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8');
console.log('Part 2 Answer: ', solution_part2(input2));
