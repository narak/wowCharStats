export function byBoss(allStats) {
    let byBoss = {},
        bosses = {};

    for (const key in allStats) {
        const val = allStats[key];

        if (val.isFetching) continue;
        const name = val.name,
            rankings = val.zoneRankings?.rankings;

        // eslint-disable-next-line
        byBoss[name] = rankings
            ? rankings.map(rank => {
                  const boss = rank.encounter.name;

                  if (!bosses[boss]) {
                      bosses[boss] = true;
                  }

                  return {
                      boss,
                      bestAmount: rank.bestAmount,
                      bestSpec: rank.bestSpec,
                  };
              })
            : val.isError
            ? val
            : undefined;
    }
    return { byBoss: byBoss, bosses: Object.keys(bosses) };
}
