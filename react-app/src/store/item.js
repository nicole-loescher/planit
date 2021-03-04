const LOAD_ITEMS = 'item/loadItems';
const ADD_ITEM = 'item/addItem';
const REMOVE_ITEM = 'item/removeItem';

const loadItems = (items) => {
    return {
        type: LOAD_ITEMS,
        payload: items,
    };
};

const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item,
    };
};

// export const loadParties = (userId) => async dispatch => {
//     const response = await fetch('/api/planits/', {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     const parties = await response.json();
//     dispatch(loadParty(parties));
//     return parties;
// }

export const addOneItem = (name, party_id, user_id) => async dispatch => {
    const response = await fetch(`/api/planits/${party_id}/items`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            party_id,
            user_id
        }),
    });
    const item = await response.json()
    console.log('=======================', item)
    dispatch(addItem(item))
    return item
}

const itemsReducer = (state = {items: []}, action) => {
    switch (action.type) {
        case LOAD_ITEMS: {
            const newItems = {};
            action.items.forEach(item => {
                newItems[item.id] = item;
            })
            return {
                ...state,
                ...newItems
            }
        }
        case REMOVE_ITEM: {
            const newState = { ...state };
            delete newState[action.itemId];
            return newState;
        }
        case ADD_ITEM: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        default:
            return state;
    }
};

export default itemsReducer;