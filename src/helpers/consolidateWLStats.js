export function byBoss(allStats) {
    let byBoss = {},
        bosses = {};

    for (const key in allStats) {
        const val = allStats[key];

        if (val.isFetching || val.isError) continue;

        const name = val.name,
            rankings = val.zoneRankings?.rankings;

        // eslint-disable-next-line
        byBoss[name] = rankings?.map(rank => {
            const boss = rank.encounter.name;

            if (!bosses[boss]) {
                bosses[boss] = true;
            }

            return {
                boss,
                bestAmount: rank.bestAmount,
                bestSpec: rank.bestSpec,
            };
        });
    }
    return { byBoss: byBoss, bosses: Object.keys(bosses) };
}
