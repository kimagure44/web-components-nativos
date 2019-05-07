const UTILS = {
    msn: msn => {
        console.log(msn);
    },
    testAPI: () => {
        const idCharacter = '5a0fa4daae5bc100213c232e';
        const idHouse = '5a05e2b252f721a3cf2ea33f';
        HPAPI.query().then(response => msn(response)).catch(err => msn(err));
        HPAPI.query('hat').then(response => msn(response)).catch(err => msn(err));
        HPAPI.query('characters').then(response => msn(response)).catch(err => msn(err));
        HPAPI.query('characters', idCharacter).then(response => msn(response)).catch(err => msn(err));
        HPAPI.query('houses').then(response => msn(response)).catch(err => msn(err));
        HPAPI.query('houses', idHouse).then(response => msn(response)).catch(err => msn(err));
        HPAPI.query('spells').then(response => msn(response)).catch(err => msn(err));
    },
    addEventlistenerMultiple: (el, evt, callback) => {
        el.forEach(el => {
            el.addEventListener(evt, callback);
        });
    },
    getBoolean(val) {
        return !!JSON.parse(String(val).toLowerCase());
    }
}
export { UTILS };