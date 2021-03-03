const SET_USER = 'auth/setUser';
const REMOVE_USER = 'auth/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const signUp = async (first_name, last_name, image_url, email, password) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name,
            last_name,
            image_url,
            email,
            password,
        }),
    });
    const user = await response.json()
    dispatchEvent(setUser(user));
    return user;
};

const authReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default authReducer;
