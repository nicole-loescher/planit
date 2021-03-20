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
export const updatePhoto = (id, image) => async dispatch => {
    let form = new FormData();
    form.append('image', image)
    if(!form){
        return 'loading'
    }
    if(form){
        const response = await fetch(`api/users/${id}`, {
            method: 'PUT',
            body: form,  
        });
        console.log(form)
        const user = await response.json()
        dispatch(setUser(user))
        return user;
    }
}
export const signUp = (first_name, last_name, image, email, password) => async dispatch =>{
    const form = new FormData();
    form.append('first_name', first_name)
    form.append('last_name', last_name)
    form.append('image', image)
    form.append('email', email)
    form.append('password', password)
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: form,
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
