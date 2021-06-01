import * as actionTypes from "./actionTypes";

export const userLogin = (accessToken, refreshToken, userId) => {
    return {
        type: actionTypes.USER_LOGIN,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: userId,
    };
};

export const userLogout = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    };
};
