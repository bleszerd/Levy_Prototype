const EXPLICITY_WORDS = ['EXPLICITY', 'explicity', 'sweet duck']

//Filter explicity words based on array EXPLICITY_WORDS above
export function hasAnyExplicityWords(name: string, stringFilter: string[] = EXPLICITY_WORDS) {
    //if name is empty the name is not explicity
    if (name == "")
        return false

    let hasExplicityWord = false

    //Filter all words in stringFilter
    stringFilter.forEach(word => {
        //if word exist in stringFilter the name is explicit
        if (name.includes(word)) {
            hasExplicityWord = true
            return
        }
    })

    return hasExplicityWord
}

//Verify if name is valid
export function validateName(name: string) {
    //Name is valid if has a name, name length is greater than 2 chars and no have explicity word
    if ((!!name && name?.length >= 3) && !hasAnyExplicityWords(name)) {
        return true
    } else {
        return false
    }
}

//Convert money string from backend to correct decimal format
export function parseStrMoneyToCorrectFormat(strMoney: string){
    const convertedMoney = (Number(strMoney) / 100).toFixed(2).toString()

    return convertedMoney
}

export function parseStrCategoryToCorrectFormat(strCategory: string){
    return strCategory === "new" ? "Novo" : "Usado"
}