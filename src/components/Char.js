// const url =
//     'https://raider.io/api/v1/characters/profile?region=us&realm=frostmourne&name=moirelina&fields=mythic_plus_scores_by_season:current,mythic_plus_best_runs';
// fetch(url)
//     .then(resp => resp.json())
//     .then(console.log);

export default function Char({ char }) {
	return <div>{JSON.stringify(char)}</div>;
}
