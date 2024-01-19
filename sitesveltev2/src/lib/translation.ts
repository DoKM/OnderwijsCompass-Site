export enum LANGUAGE {
    english,
    dutch
}
export function getTextForKey(key:string, language:LANGUAGE):string{
    // grab the key from the map, if its undefined check the other map
    const primaryMap = language==LANGUAGE.english?englishDictionary:dutchDictionary;
    const fallback = language==LANGUAGE.english?dutchDictionary:englishDictionary;
    let returnValue = primaryMap.get(key)
    if(!returnValue){
        returnValue = fallback.get(key)
    }
    if(!returnValue){
        returnValue = `Could not find key: ${key}`
    }
    return returnValue;
}


const englishDictionary = new Map();
const dutchDictionary = new Map();

const keyTranslationPairs: {key: string, translationEng: string, translationNL: string}[] = [
    { key: "Role model", translationEng: "Role model", translationNL: "Rolmodel" },
    { key: "Reflection", translationEng: "Reflection", translationNL: "Reflectie" },
    { key: "Interaction", translationEng: "Interaction", translationNL: "Interactie" },
    { key: "Accessibility", translationEng: "Accessibility", translationNL: "Toegankelijkheid" },
    { key: "Support structures", translationEng: "Support structures", translationNL: "Ondersteuningsstructuren" },
    { key: "Flexible and coherent programme", translationEng: "Flexible and coherent programme", translationNL: "Flexibel en samenhangend programma" },
    { key: "Feedback", translationEng: "Feedback", translationNL: "Feedback" },
    { key: "Peerfeedback", translationEng: "Peerfeedback", translationNL: "Peerfeedback" },
    { key: "Collaborative learning", translationEng: "Collaborative learning", translationNL: "Samenwerkend leren" },
    { key: "HZ wide activities", translationEng: "HZ wide activities", translationNL: "HZ-Brede activiteiten" },
    { key: "Collaboration with practice and research partners", translationEng: "Collaboration with practice and research partners", translationNL: "Samenwerking met praktijk- en onderzoekspartners" },
    { key: "Professional skills in context", translationEng: "Professional skills in context", translationNL: "Vaardigheden van het beroep in context" },
    { key: "Across boundaries of the own discipline", translationEng: "Across boundaries of the own discipline", translationNL: "Over de grenzen van de eigen discipline" },
    { key: "The teacher as professional", translationEng: "The teacher as professional", translationNL: "Docent als vakmens" },
    { key: "The teacher as coach", translationEng: "The teacher as coach", translationNL: "Docent als coach" },
    { key: "Ethical conduct", translationEng: "Ethical conduct", translationNL: "Ethisch handelen" },
    { key: "Expressing values and norms", translationEng: "Expressing values and norms", translationNL: "Waarden en normen uitdragen" },
    { key: "Connecting to prior knowledge and perception", translationEng: "Connecting to prior knowledge and perception", translationNL: "Aansluiten bij voorkennis en belevingswereld" },
    { key: "Professional profile", translationEng: "Professional profile", translationNL: "Beroepsbeeld" },
    { key: "Structure and clear expectations", translationEng: "Structure and clear expectations", translationNL: "Structuur en heldere verwachtingen" },
    { key: "Coherent assessment programme", translationEng: "Coherent assessment programme", translationNL: "Samenhangend toetsprogramma" },
    { key: "Vision on professional competence", translationEng: "Vision on professional competence", translationNL: "Visie op beroepsbekwaamheid" },
    { key: "Working on resilience", translationEng: "Working on resilience", translationNL: "Werken aan weerbaarheid" },
    { key: "Safety net", translationEng: "Safety net", translationNL: "Vangnet" },
    { key: "An eye for the individual", translationEng: "An eye for the individual", translationNL: "Oog voor het individu" },
    { key: "Learning from mistakes", translationEng: "Learning from mistakes", translationNL: "Leren van fouten" },
    { key: "Individual study pace", translationEng: "Individual study pace", translationNL: "Individueel studietempo" },
    { key: "Room for autonomy", translationEng: "Room for autonomy", translationNL: "Ruimte voor autonomie" },
    { key: "Room for spontaneity", translationEng: "Room for spontaneity", translationNL: "Ruimte voor spontaniteit" },
    { key: "Strong knowledge base", translationEng: "Strong knowledge base", translationNL: "Sterke kennisbasis" },
    { key: "Choices", translationEng: "Choices", translationNL: "Keuzemogelijkheden" },
    { key: "Change Language", translationEng: "Change Language", translationNL: "Verander Taal"},
    { key: "Hide Extra Rows", translationEng: "Hide Extra Rows", translationNL: "Verberg Extra Rijen"},
    { key: "Show All Rows", translationEng: "Show All Rows", translationNL: "Laat Alle Rijen Zien"},
    { key: "Reset", translationEng: "Reset", translationNL: "Reset"},
    { key: "OnderwijsKompas", translationEng: "OnderwijsKompas - Important Subjects", translationNL: "OnderwijsKompas - Belangrijke Onderwerpen"},
    { key: "Results", translationEng: "Results", translationNL: "Resultaten"},
    { key: "Reset Data", translationEng: "Are you sure you want to reset the server data?", translationNL: "Weet je het zeker dat je alle data op de server wil resseten?"},
    { key: "SaveCSV", translationEng: "Save Data as CSV", translationNL: "Sla data op als CSV"}
];

keyTranslationPairs.forEach(({ key, translationEng, translationNL }) => {
    englishDictionary.set(key, translationEng);
    dutchDictionary.set(key, translationNL)

});
