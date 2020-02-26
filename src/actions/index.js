export const increment = (number) => {
    return {
        type: 'INCREMENT',
        payload: number
    }; 
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }; 
}

export const signIn = () => {
    return {
        type: 'SIGN_IN'
    };
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
}

export const toggleCross = (id) => {
    return {
        type: 'TOGGLE_CROSS',
        complete: false,
        id
    };
}