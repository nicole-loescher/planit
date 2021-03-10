const ADD_INVITE = 'invite/addInvite';

const addInvite = (invite) => {
    return {
        type: ADD_INVITE,
        payload: invite,
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
    dispatch(addInvite(invite))
    return invite
}

const inviteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_INVITE: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        default:
            return state;
    }
};

export default inviteReducer;