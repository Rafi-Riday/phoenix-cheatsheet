export const upperCaseWord = (str, splitter = '-', joiner = ' ') => {
    return str?.split(splitter).map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(joiner);
}

export const randomNumRange = (max) => {
    return Math.floor(Math.random() * max);
};

// export const range = n => Array.from(Array(n).keys())

export const range = (start, stop, step) => {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    let result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};
