const fs = require('fs');
const path = require('path');

const safetyChecks = (parts) => {
  const MIN_DIFFER = 1;
  const MAX_DIFFER = 3;
  const INCREASING = 'INCREASING';
  const DECREASING = 'DECREASING';
  let direction = null;
  for (let i = 0; i < parts.length - 1; i++) {
    const cur = parseInt(parts[i]);
    const next = parseInt(parts[i + 1]);
    if (direction == null) {
      direction = cur < next ? INCREASING : DECREASING;
    }

    if (next < cur && direction == INCREASING) return false;
    if (next > cur && direction == DECREASING) return false;
    if (Math.abs(next - cur) < MIN_DIFFER) return false;
    if (Math.abs(next - cur) > MAX_DIFFER) return false;
  }
  return true;
};

const checkSafetyLevels = (input, dampen = false) => {
  let numSafe = 0;
  const reports = input.split('\n');

  const isSafe = (report, dampen) => {
    if (report.length == 0) {
      return false;
    }
    const parts = report.split(' ');
    const valid = safetyChecks(parts);
    if (valid) {
      return true;
    }
    if (dampen) {
      for (let i = 0; i < parts.length; i++) {
        const newReport = [...parts.slice(0, i), ...parts.slice(i + 1)].join(' ');
        const validWithDampen = isSafe(newReport, false);
        if (validWithDampen) {
          return true;
        }
      }
    }
    return false;
  };

  reports.map((report) => {
    const safe = isSafe(report, dampen);
    if (safe) {
      console.log('SAFE: ', report);
      numSafe += 1;
    } else {
      console.log('NOT_SAFE: ', report);
    }
  });
  return numSafe;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8')
// console.log('Part 1 Answer: ', checkSafetyLevels(input));

const input2 = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample-input.txt'), 'utf8')
console.log('Part 2 Answer: ', checkSafetyLevels(input2, true));
