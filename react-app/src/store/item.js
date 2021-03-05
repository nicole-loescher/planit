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

export const loadAllItems = (partyId) => async dispatch => {
    const response = await fetch(`/api/planits/${partyId}/items`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const items = await response.json();
    dispatch(loadItems(items));
    return items;
}

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
    dispatch(addItem(item))
    return item
}

const itemsReducer = (state = {items: []}, action) => {
    switch (action.type) {
        case LOAD_ITEMS: {
            const newItems = {};
            action.payload.party_items.forEach(item => {
                newItems[item.id] = item;
            })
            return {
                ...state,
                ...newItems,
                items: [action.payload.party_items]
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