const LOAD_ITEMS = 'item/loadItems';
const ONE_ITEM = 'item/oneItem';
const REMOVE_ITEM = 'item/removeItem';

const loadItems = (items) => {
    return {
        type: LOAD_ITEMS,
        payload: items,
    };
};

const oneItem = (item) => {
    return {
        type: ONE_ITEM,
        payload: item,
    };
};
const removeParty = () => {
    return {
        type: REMOVE_PARTY,
    };
};

export const loadParties = (userId) => async dispatch => {
    const response = await fetch('/api/planits/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parties = await response.json();
    dispatch(loadParty(parties));
    return parties;
}

export const create = (host_id, name, details, starts_at, ends_at, image_url, location) => async dispatch => {
    console.log('++++++++++++++++++++++++++++++++')
    const response = await fetch('/api/planits/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            host_id,
            name,
            details,
            starts_at,
            ends_at,
            image_url,
            location,
        }),
    });
    const party = await response.json()
    console.log('=======================', party)
    dispatch(oneParty(party))
    return party
}