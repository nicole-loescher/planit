const ADD = 'invite/add';
const LOAD = 'invite/load';

const add = (invite) => {
    return {
        type: ADD,
        payload: invite,
    };
};
const load = (guests) => {
    return {
        type: LOAD,
        payload: guests,
    };
};

export const inviteGuest = (party_id, user_id) => async dispatch => {
    // const form = new FormData()
    // form.append('party_id', party_id)
    // form.append('user_id', user_id)
    const response = await fetch(`/api/planits/${party_id}/guests`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            party_id,
            user_id
        })
    });
    const invite = await response.json()
    dispatch(add(invite))
    return invite
}

export const loadGuests = (party_id) => async dispatch => {
    const response = await fetch(`/api/planits/${party_id}/guests`,{
        method:'GET'
    })
    const guests = await response.json();
    dispatch(load(guests));
    return guests;
}

const inviteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case LOAD: {
           const newInvites = {};
            action.payload.guest_list.forEach(guest => {
                newInvites[guest.id] = guest;
            })
            return {
                // ...state,
                ...newInvites,
                // items: [action.payload.party_items]
            }
        }
        default:
            return state;
    }
};

export default inviteReducer;