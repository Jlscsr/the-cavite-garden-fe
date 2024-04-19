const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
};

const firstLetterUppercase = (str) => {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

const formatString = (str) => {
    if (str) {
        let words = str.split("-");

        words = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
        );

        return words.join(" ");
    }
};

export { formatDate, firstLetterUppercase, formatString };
