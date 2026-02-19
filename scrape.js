async function scrape() {
    const response = await fetch(
        "https://rickiheicklen.com/unparalleled-misalignments.html",
    );
    const doc = new DOMParser().parseFromString(
        await response.text(),
        "text/html",
    );

    const entries = [];
    const validEntries = [];

    const entryObjects = doc.querySelectorAll(".UMD_LIST .UMD_BODY");
    for (const entry of entryObjects) entries.push(entry.innerHTML);

    const possibleEntries = [];
    for (const entry of entries)
        if ((entry.match(/[a-zA-Z]/g) || []).length < 15)
            possibleEntries.push(entry);

    const nontrivialEntries = [];
    for (const entry of possibleEntries) {
        if (entry.length <= 15) validEntries.push(entry);
        else nontrivialEntries.push(entry);
    }

    const trimmedDelimiterEntries = [];
    for (const entry of nontrivialEntries) {
        const newEntry = entry.replace(" // ", "//");
        if (newEntry.length <= 15) validEntries.push(newEntry);
        else trimmedDelimiterEntries.push(newEntry);
    }

    const minimalDelimiterEntries = [];
    for (const entry of trimmedDelimiterEntries) {
        const newEntry = entry.replace("//", "/");
        if (newEntry.length == 15) validEntries.push(newEntry);
        else minimalDelimiterEntries.push(newEntry);
    }

    const pascalCaseEntries = [];
    for (const entry of minimalDelimiterEntries) {
        const newEntry = entry
            .replace(/(?:^|\s+)(\S)/g, (_, c) => c.toUpperCase())
            .replace(/\s+/g, "");
        if (newEntry.length <= 15) validEntries.push(newEntry);
        else pascalCaseEntries.push(newEntry);
    }

    console.log(JSON.stringify(validEntries));
}
scrape();
