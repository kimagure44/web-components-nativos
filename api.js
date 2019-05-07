import { accessData } from './access-data.js';
const HPAPI = {
    user: accessData.user,
    apiKey: accessData.apiKey,
    baseURL: 'https://www.potterapi.com/v1/',
    endPoint: {
        hat: 'sortingHat',
        characters: 'characters',
        houses: 'houses',
        spells: 'spells'
    },
    json: async (data) => await data.json(),
    query: async (endPoint, id = '') => {
        let result;
        const existEndpoint = Object.keys(HPAPI.endPoint).includes(endPoint);
        if (endPoint && existEndpoint) {
            const url = `${HPAPI.baseURL}${HPAPI.endPoint[endPoint]}/${id}?key=${HPAPI.apiKey}`;
            const response = await fetch(url);
            result = HPAPI.json(response);
        } else {
            result = {
                error: `The endpoint is mandatory: \'${Object.keys(HPAPI.endPoint).join(' / ')}\'`,
            };
        }
        return result;
    }
}
export { HPAPI };
