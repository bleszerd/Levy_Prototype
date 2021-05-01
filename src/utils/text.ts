const EXPLICITY_WORDS = ['buceta']

export function hasAnyExplicityWords(name: string, stringFilter: string[] = EXPLICITY_WORDS){
    if(name == "")
        return false
        
    let hasExplicityWord = false

    stringFilter.forEach(word => {
        if(name.includes(word)){
            hasExplicityWord = true
            return
        }
    })
    return hasExplicityWord
}

export function validateName(name: string){
    if ((!!name && name?.length >= 3) && !hasAnyExplicityWords(name)) {
        return true
    } else {
        return false
    }
}