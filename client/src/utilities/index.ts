const FirstLetterToUppercase = (word: string): string => {
    let FinalWord: string = "";

    for (let i: number = 0; i < word.length; i++) {
        if (i === 0) {
            FinalWord = FinalWord + word[i].toUpperCase();
        } else {
            FinalWord = FinalWord + word[i];
        }
    }

    return FinalWord;
};

export { FirstLetterToUppercase };
