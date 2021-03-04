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

export const signUp = (first_name, last_name, image_url, email, password) => async dispatch =>{
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
    dispatch(setUser(user));
    return user;
};

export const login = (email, password) => async (dispatch) => {
const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password,
    }),
});
const user = await response.json()
dispatch(setUser(user));
return user
};

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    dispatch(removeUser());
    const res = await response.json()
    return res;
};


export const authenticate = () => async dispatch => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const user = await response.json()
    dispatch(setUser(user));
    return user
}


const authReducer = (state = {user: {}}, action) => {
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
