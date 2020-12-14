
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const receiveCurrentUser = userId => ({
    action: RECEIVE_CURRENT_USER,
    userId
})

export const receiveUserLogout = () => ({
    action: RECEIVE_USER_LOGOUT,
});


