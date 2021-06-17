const { BlizzAPI } = require('blizzapi');

/**
 * Or using TypeScript:
 * import { BlizzAPI } from 'blizzapi';
 */

const api = new BlizzAPI({
    region: 'us',
    clientId: '4dd2c25f717d44a0ac46dcc49881ae4a',
    clientSecret: 'T91VOqUIToC84Db2sbe7avBi0Z37VZa1',
});

const realmSlug = 'frostmourne';
const characterName = 'aali';
// api.query(`/profile/wow/character/${realmSlug}/${characterName}/mythic-keystone-profile/season/5`, {
// api.query(`/profile/wow/character/${realmSlug}/${characterName}/encounters/dungeons`, {
// api.query(`/profile/wow/character/${realmSlug}/${characterName}`, {
// api.query(`/profile/wow/character/${realmSlug}/${characterName}/statistics`, {
// api.query(`/profile/wow/character/${realmSlug}/${characterName}/specializations`, {
api.query(`/profile/wow/character/${realmSlug}/${characterName}/achievements/statistics`, {
    headers: { 'Battlenet-Namespace': 'profile-us', locale: 'en_US' },
})
    .then(resp => {
        console.log(JSON.stringify(resp, undefined, '    '));
    })
    .catch(console.error);
