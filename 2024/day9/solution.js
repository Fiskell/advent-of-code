const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const shiftMemory = (memory) => {
  let right = memory.length - 1;
  for (let left = 0; left < memory.length; left++) {
    if (left > right) {
      break;
    }
    if (memory[left] === '.') {
      while (true) {
        if (memory[right] !== '.') {
          memory[left] = memory[right];
          memory[right] = '.';
          break;
        }
        right--;
        if (right < left) {
          break;
        }
      }
      continue;
    }
  }

  return memory;
};

const sum = (memory) => {
  let ret = 0;
  for (let i = 0; i < memory.length; i++) {
    if (memory[i] !== '.') {
      ret += parseInt(memory[i]) * i;
    }
  }
  return ret;
};

const solution_part1 = (input) => {
  const parts = input.split('');
  let ret = 0;
  let out = [];
  let id = 0;
  for (let i = 0; i < parts.length; i++) {
    const isFile = i % 2 === 0;
    const isFreeSpace = i % 2 === 1;
    const val = parts[i];

    if (isFile) {
      out = [...out, ...Array(parseInt(val)).fill(id)];
      id++;
    } else {
      out = [...out, ...Array(parseInt(val)).fill('.')];
    }
  }

  out = shiftMemory(out);
  console.log(out.join(''));
  return sum(out);
};

const rebalanceMemory = (files, memory, freeSpace) => {
  for (let f = files.length - 1; f >= 0; f--) {
    const file = files[f];
    if (file.moved) {
      continue;
    }
    const size = parseInt(file.size);
    //find index of first string of '.' that is the same size as the file
    const index = freeSpace.indexOf(Array(size).fill('.').join(''));
    if (index === -1) {
      continue;
    }

    if (index > file.index) {
      continue;
    }

    // set new memory
    memory.splice(index, size, ...Array(size).fill(file.id));

    // add free space
    freeSpace = freeSpace.slice(0, file.index) + Array(size).fill('.').join('') + freeSpace.slice(file.index + size);

    // unset old memory
    memory.splice(file.index, file.size, ...Array(parseInt(file.size)).fill('.'));

    files[f].index = index;

    // remove free space
    freeSpace = freeSpace.slice(0, index) + Array(size).fill('#').join('') + freeSpace.slice(index + size);
    files[f].moved = true;
  }
  return [files, memory];
};

const solution_part2 = (input) => {
  const parts = input.split('');
  let id = 0;
  let files = [];
  let memory = [];
  let freeSpace = [];
  for (let i = 0; i < parts.length; i++) {
    const isFile = i % 2 === 0;
    const val = parts[i];

    if (isFile) {
      files.push({
        id,
        index: memory.length,
        size: val,
        moved: false,
      });
      memory = memory.concat(Array(parseInt(val)).fill(id));
      freeSpace = freeSpace.concat(Array(parseInt(val)).fill('#'));
      id++;
    } else {
      memory = memory.concat(Array(parseInt(val)).fill('.'));
      freeSpace = freeSpace.concat(Array(parseInt(val)).fill('.'));
    }
  }
  const [newFiles, newMemory] = rebalanceMemory(files, memory, freeSpace.join(''));
  return sum(newMemory);
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.log('Part 2 Answer: ', solution_part2(input2));

module.exports = {
  solution_part1,
  solution_part2,
};
