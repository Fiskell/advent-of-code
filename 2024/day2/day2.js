const { dir } = require('console');
const fs = require('fs');
const path = require('path');


const MIN_DIFFER = 1;
const MAX_DIFFER = 3;
const INCREASING = "INCREASING";
const DECREASING = "DECREASING";
const safetyChecks = (cur, next, direction) => {
    if (next < cur && direction == INCREASING) {
        console.log('NOT SAFE: Should be increasing')
        return false;
    } else if (next > cur && direction == DECREASING) {
        console.log('NOT SAFE: Should be decreasing')
        return false;
    } else if (Math.abs(next - cur) < MIN_DIFFER) {
        console.log(`(${Math.abs(next - cur)}) NOT SAFE: Below minimum difference`)
        return false;
    } else if (Math.abs(next - cur) > MAX_DIFFER) {
        console.log(`(${Math.abs(next - cur)}) NOT SAFE: Above maximum difference`)
        return false;
    }
    return true;
}

const checkSafetyLevels = (input, dampen=false) => {
    let numSafe = 0;
    const reports = input.split('\n');

    const isSafe = (report, withDampen=false) => {
        const parts = report.split(' ');
        let direction = INCREASING;
        let dampened = false;
        for(let i = 0; i < parts.length-1; i++) {
            const cur = parseInt(parts[i]);
            const next = parseInt(parts[i+1]);

            if (i == 0 && next < cur) {
                direction = DECREASING;
            }

            const safe = safetyChecks(cur, next, direction);

            if(!safe && !withDampen) {
                return false;
            }

            if(safe) {
                continue;
            }

            console.log('--Attempting to dampen: ', withDampen, dampened, i, parts.length-2);

            if(dampened) {
                return false;
            }

            if(!safe && withDampen && !dampened && i < parts.length-2) {
                const nextNext = parseInt(parts[i+2]);
                let nextNextDir = INCREASING;
                if (i == 0 && nextNext < cur) {
                    nextNextDir = DECREASING;
                }

                let skipCurDir = INCREASING;
                if (i == 0 && nextNext < next) {
                    skipCurDir = DECREASING;
                }

                dampened = true;
                console.log('--Dampening: ', cur, next, nextNext, nextNextDir, skipCurDir);
                if (safetyChecks(cur, nextNext, nextNextDir)) {
                    direction = nextNextDir;
                    i += 1;
                    continue;
                } else if(safetyChecks(next, nextNext, skipCurDir)) {
                    direction = skipCurDir;
                    i += 1;
                    continue;
                }
                console.log('--Dampening failed\n');
                return false;
            }
        }
        if(dampened) {
            console.log('Dampening successful\n');
        }
        return true;
    }

    reports.map((report) => {
        // console.log(`\n${report}`);
        const safe = isSafe(report, dampen)
        if (safe) {
            // console.log('SAFE: ', report);
            numSafe += 1;
        } else {
            console.log('NOT_SAFE: ', report, '\n');
        }
    });
    return numSafe
    
}

// const input = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8')
// console.log('Part 1 Answer: ', checkSafetyLevels(input));

const input2 = fs.readFileSync(path.resolve(__dirname, 'part1-input.txt'), 'utf8')
console.log('Part 2 Answer: ', checkSafetyLevels(input2, true));

