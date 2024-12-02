const { dir } = require('console');
const fs = require('fs');
const path = require('path');


const MIN_DIFFER = 1;
const MAX_DIFFER = 3;
const INCREASING = "INCREASING";
const DECREASING = "DECREASING";
const safetyChecks = (cur, next, direction) => {
    console.log('checking: ', cur, next, direction);
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

    const isSafe = (report, withDampen=false, hasDampened=false) => {
        console.log('func IsSafe: ', report, withDampen, hasDampened);
        const parts = report.split(' ');
        let direction = null;
        let dampened = hasDampened;
        for(let i = 0; i < parts.length-1; i++) {
            const cur = parseInt(parts[i]);
            const next = parseInt(parts[i+1]);
            
            if(direction == null) {
                direction = (next < cur) ? DECREASING : INCREASING;
            }
            console.log(direction, cur, next);

            const safe = safetyChecks(cur, next, direction);

            // We're good
            if(safe) {
                continue;
            }

            // Not safe and not dampening (part 1)
            if(!withDampen) {
                console.log('NOT SAFE: dampening is off');
                return false;
            }

            // Already dampened
            if(dampened) {
                console.log('NOT SAFE: Already dampened');
                return false;
            }

            console.log('--Attempting to dampen: ', withDampen, dampened, i, parts.length-2, direction);

            // Made it to the end, just remove the last element to "dampen"
            if(i == parts.length-2) {
                console.log('SAFE: Dampening last element');
                return true;
            }

            dampened = true;
            const nextNext = parseInt(parts[i+2]); 

            // // Set the dampened direction against the next next element
            // let nextNextDir = direction;
            // // Set the direction when skipping the current element
            // let skipCurDir = direction;
            // if(i == 0) {
            //     nextNextDir = (nextNext < cur) ? DECREASING : INCREASING;
            //     skipCurDir  = (nextNext < next) ? DECREASING : INCREASING;
            // }

            console.log('--Dampening: ', cur, next, nextNext);
            // Call isSafe again with the 'next' element removed
            const newReport = parts.slice(0, i + 1).concat(parts.slice(i + 2)).join(' ');
            if (isSafe(newReport, withDampen, true)) {
                console.log('SAFE: Dampening by removing element');
                return true;
            } 
            // Call isSafe again with the 'cur' element removed
            const newReport2 = parts.slice(0, i).concat(parts.slice(i + 1)).join(' ');
            if (isSafe(newReport2, withDampen, true)) {
                console.log('SAFE: Dampening by removing element');
                return true;
            }

            // // Try to dampen to next next element
            // if (safetyChecks(cur, nextNext, nextNextDir)) {
            //     direction = nextNextDir;
            //     i += 1;
            //     continue;

            // // Try to dampen next and next next (remove current)
            // } else if(safetyChecks(next, nextNext, skipCurDir)) {
            //     direction = skipCurDir;
            //     i += 1;
            //     continue;
            // }
            console.log('NOT SAFE: Dampening failed');
            return false;
        }
        if(dampened) {
            console.log('Dampening successful\n');
        }
        return true;
    }

    reports.map((report) => {
        console.log(`\n${report}`);
        const safe = isSafe(report, dampen)
        if (safe) {
            console.log('SAFE: ', report);
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

