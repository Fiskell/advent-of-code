const fs = require('fs');
const path = require('path');

const solution_part1 = (input, useHasSeen) => {
  let nums = input.split(' ');
  let NUM_BLINKS = 25;
  for (let i = 1; i <= NUM_BLINKS; i++) {
    console.log(`After ${i} blinks: ${nums.length}`);
    let newNums = [];
    nums.forEach((num, i) => {
      if (num === '0') {
        newNums.push('1');
      } else if (num.length % 2 === 0) {
        let half = num.length / 2;
        let firstHalf = num.substring(0, half);
        let secondHalf = parseInt(num.substring(half, num.length)).toString();
        newNums.push(firstHalf);
        newNums.push(secondHalf);
      } else {
        newNums.push((parseInt(num) * 2024).toString());
      }
    });
    nums = newNums;
  }
  return nums.length;
};

const solution_part2 = (input) => {
  let nums = input.split(' ').map((num) => BigInt(num));
  let cache = new Map(); // cache[number][blink] = count
  let MAX_BLINKS = 4445;
  let totalCount = BigInt(0);

  const getCountAfterBlinks = (num, blinks) => {
    const key = `${num},${blinks}`;
    if (cache.has(key)) {
      return cache.get(key);
    }

    if (blinks === 0) {
      return BigInt(1);
    }

    let newCount = BigInt(0);
    let num_str = num.toString();

    if (num_str === '0') {
      newCount = getCountAfterBlinks(BigInt(1), blinks - 1);
    } else if (num_str.length % 2 === 0) {
      let half = num_str.length / 2;
      let firstHalf = num_str.substring(0, half);
      let secondHalf = num_str.substring(half);
      newCount =
        getCountAfterBlinks(BigInt(firstHalf), blinks - 1) + getCountAfterBlinks(BigInt(secondHalf), blinks - 1);
    } else {
      newCount = getCountAfterBlinks(num * BigInt(2024), blinks - 1);
    }

    cache.set(key, newCount);
    return newCount;
  };

  nums.forEach((num) => {
    console.log(`Processing ${num}`);
    totalCount += getCountAfterBlinks(num, MAX_BLINKS);
  });

  return totalCount.toString(); // Convert back to string for display
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.time('Part 2');
console.log('Part 2 Answer: ', solution_part2(input2));
console.timeEnd('Part 2');

module.exports = {
  solution_part1,
  solution_part2,
};
