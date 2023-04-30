export const upperCaseWord = (str, splitter = '-', joiner = ' ') => {
    return str?.split(splitter).map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(joiner);
}

export const randomNumRange = (max) => {
    return Math.floor(Math.random() * max);
};

export const range = n => Array.from(Array(n).keys())
