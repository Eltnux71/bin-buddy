export async function getCollections() {
    const today = new Date();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const fromDate =
        today.toISOString().split("T")[0];

    const toDate =
        endDate.toISOString().split("T")[0];

    const response = await fetch(
        `https://cms.northnorthants.gov.uk/bin-collection-search/calendarevents/100031038143/${fromDate}/${toDate}`
    );

    const text = await response.text();

    return JSON.parse(text);
}
