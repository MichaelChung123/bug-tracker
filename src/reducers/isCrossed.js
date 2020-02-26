const crossedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_CROSS':
            console.log('STATE: ', state);
            console.log('ACTION: ', action); 

            action.complete = !action.complete;

            return action.complete;

            // state.map((user) => {
            //     console.log(state);
            //     console.log(user);
            //     user.id === action.id ? {
            //         ...user,
            //         completed: !user.completed
            //     } : user
            // });

            // return action.id
        default:
            return state;
    }
}

export default crossedReducer;