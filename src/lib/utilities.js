export const upperCaseWord = (str, splitter = '-', joiner = ' ') => {
    return str?.split(splitter).map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(joiner);
}

export const randomNumRange = (max) => {
    return Math.floor(Math.random() * max);
};

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

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const secondsToHMS = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return { hours, min, sec };
}

export const splitMdKatex = (text) => {
    // Regular expression pattern to match $...$ without a space after the first $
    const regex = /\$[^$\s][^$]*\$/g;
    let match;
    let lastIndex = 0;
    const result = [];

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            result.push({ md: text.slice(lastIndex, match.index) });
        }
        result.push({ k: match[0].slice(1, -1) });
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        result.push({ md: text.slice(lastIndex) });
    }

    return result;
}
