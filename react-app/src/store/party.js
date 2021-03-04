const LOAD_PARTY = 'party/loadParty';
const ONE_PARTY = 'party/oneParty';
const REMOVE_PARTY = 'auth/removeParty';

const loadParty = (party) => {
    return {
        type: LOAD_PARTY,
        payload: party,
    };
};

const oneParty = (party) => {
    return {
        type: ONE_PARTY,
        payload: party,
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

export const create = ( host_id, name, details, starts_at, ends_at, image_url, location) => async dispatch => {
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


const partyReducer = (state = { parties: {} }, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PARTY:
            newState = Object.assign({}, state);
            newState.party = action.payload;
            return newState;
        case ONE_PARTY:
            newState = Object.assign({}, state);
            newState.party = action.payload;
            return newState;
        case REMOVE_PARTY:
            newState = Object.assign({}, state);
            newState.party = null;
            return newState;
        default:
            return state;
    }
};

export default partyReducer;