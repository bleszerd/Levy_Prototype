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