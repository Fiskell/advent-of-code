const fs = require('fs');
const path = require('path');

const parseList = (lists) => {
  let input = lists.split('\n');
  let leftList = [];
  let rightList = [];
  input.map((item) => {
    const parts = item.split('   ');
    leftList.push(parseInt(parts[0]));
    rightList.push(parseInt(parts[1]));
  });
  leftList.sort();
  rightList.sort();
  return { leftList, rightList };
};

const calculateSimilarity = (lists) => {
  let similarity = 0;
  const { leftList, rightList } = parseList(lists);
  const numMap = {
    left: {},
    right: {},
  };

  const updateNumMap = (list, side) => {
    list.map((item) => {
      if (numMap[side][item]) {
        numMap[side][item] += 1;
      } else {
        numMap[side][item] = 1;
      }
    });
  };

  updateNumMap(rightList, 'right');
  console.log(JSON.stringify(numMap, null, 2));
  leftList.map((item) => {
    console.log(item, numMap.right[item]);
    if (numMap.right[item]) {
      similarity += item * numMap.right[item];
    }
  });

  return similarity;
};

const findDifference = (lists) => {
  let difference = 0;
  const { leftList, rightList } = parseList(lists);
  leftList.map((item, index) => {
    const rightVal = rightList[index];
    difference += Math.abs(item - rightVal);
  });
  return difference;
};

const lists = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8');
console.log('Part 1 Answer: ', findDifference(lists));

const lists2 = fs.readFileSync(path.resolve(__dirname, 'part2-input.txt'), 'utf8');
console.log('Part 2 Answer: ', calculateSimilarity(lists2));
