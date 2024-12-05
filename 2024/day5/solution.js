const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const parseRules = (rules) => {
  const ruleMap = new Map();
  rules.forEach((rule) => {
    const parts = rule.split('|').map((x) => parseInt(x));
    const l = parseInt(parts[0]);
    const r = parseInt(parts[1]);
    if (!ruleMap[l]) {
      ruleMap[l] = [];
    }
    ruleMap[l].push(r);
  });
  return ruleMap;
};

const validPages = (pages, ruleMap) => {
  // console.log(ruleMap);
  let valid = true;
  let badIndex = null;
  let diff = [];
  for (let i = 0; i < pages.length; i++) {
    const rest = i + 1 === pages.length ? [] : pages.slice(i + 1);
    diff = _.difference(rest, ruleMap[pages[i]]);
    // console.log('diff', i, pages[i], ruleMap[pages[i]], rest, diff);

    if (diff.length > 0) {
      valid = false;
      badIndex = i;
      break;
    }
  }
  return [valid, badIndex, diff];
};

const solution_part1 = (input) => {
  const sets = input.split('\n\n');
  const rules = sets[0].split('\n');
  const rows = sets[1].split('\n');
  const ruleMap = parseRules(rules);
  let ret = 0;
  rows.forEach((row) => {
    const pages = row.split(',').map((x) => parseInt(x));
    const [valid, i, diff] = validPages(pages, ruleMap);
    // console.log('valid', valid, pages);
    if (valid) {
      const middleVal = pages[Math.floor(pages.length / 2)];
      // console.log('middle', middleVal);
      ret += middleVal;
    }
  });
  return ret;
};

const solution_part2 = (input) => {
  const sets = input.split('\n\n');
  const rules = sets[0].split('\n');
  const rows = sets[1].split('\n');
  const ruleMap = parseRules(rules);
  let ret = 0;
  rows.forEach((row) => {
    const pages = row.split(',').map((x) => parseInt(x));
    let rearrange = true;
    let newPages = [...pages];
    let count = 0;
    console.log('before', newPages);
    while (rearrange) {
      const [valid, i, diff] = validPages(newPages, ruleMap);
      if (valid) {
        break;
      }
      count++;

      const remove = _.indexOf(newPages, diff[0]);
      newPages.splice(remove, 1);
      newPages.splice(i, 0, diff[0]);
    }
    const middleOg = pages[Math.floor(pages.length / 2)];
    const middleVal = newPages[Math.floor(newPages.length / 2)];
    console.log(`after (${count}) m(${middleVal}) og(${middleOg})`, newPages, '\n');
    // console.log('middle', iddleVal);
    if (count > 0) {
      ret += middleVal;
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
