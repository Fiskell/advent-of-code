const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const FREE = '.';
const TAKEN = '#';

const expand = (val, numTimes) => {
  return Array(parseInt(numTimes)).fill(val);
};

const shiftMemory = (memory) => {
  let right = memory.length - 1;
  for (let left = 0; left < memory.length; left++) {
    if (left > right) {
      break;
    }
    if (memory[left] === FREE) {
      while (true) {
        if (memory[right] !== FREE) {
          memory[left] = memory[right];
          memory[right] = FREE;
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
  return memory.reduce((ret, val, i) => (val !== FREE ? ret + parseInt(val) * i : ret), 0);
};

const solution_part1 = (input) => {
  const parts = input.split('');
  let out = [];
  let id = 0;
  for (let i = 0; i < parts.length; i++) {
    const isFile = i % 2 === 0;
    const val = parts[i];

    if (isFile) {
      out = [...out, ...expand(id, val)];
      id++;
    } else {
      out = [...out, ...expand(FREE, val)];
    }
  }

  out = shiftMemory(out);
  console.log(out.join(''));
  return sum(out);
};

const defrag = (files, memory, freeSpace) => {
  for (let f = files.length - 1; f >= 0; f--) {
    const file = files[f];

    // Skip if already moved
    if (file.moved) {
      continue;
    }

    const size = parseInt(file.size);

    //find index of first string of '.' that is the same size as the file
    const index = freeSpace.indexOf(expand(FREE, size).join(''));

    // No free space can fit the file
    if (index === -1) {
      continue;
    }

    // Don't move if it's in a good position already
    if (index > file.index) {
      continue;
    }

    // Set new memory
    memory.splice(index, size, ...expand(file.id, size));
    // Add free space
    freeSpace = freeSpace.slice(0, file.index) + expand(FREE, size).join('') + freeSpace.slice(file.index + size);
    // Unset old memory
    memory.splice(file.index, file.size, ...expand(FREE, file.size));
    // Remove free space
    freeSpace = freeSpace.slice(0, index) + expand(TAKEN, size).join('') + freeSpace.slice(index + size);

    // Update file
    files[f].index = index;
    files[f].moved = true;
  }
  return memory;
};

const solution_part2 = (input) => {
  const parts = input.split('');
  let id = 0;
  let files = [];
  let memory = [];
  let freeSpace = [];
  parts.forEach((val, i) => {
    const isFile = i % 2 === 0;
    if (isFile) {
      files.push({
        id,
        index: memory.length,
        size: val,
        moved: false,
      });
      memory = memory.concat(expand(id, val));
      freeSpace = freeSpace.concat(expand(TAKEN, val));
      id++;
    } else {
      memory = memory.concat(expand(FREE, val));
      freeSpace = freeSpace.concat(expand(FREE, val));
    }
  });
  const newMemory = defrag(files, memory, freeSpace.join(''));
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
