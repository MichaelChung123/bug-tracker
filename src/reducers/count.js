const count = (state = 0, action) => {
    switch (action.type) {
        case 'INCREASE_COUNTER':
            return {
                todoCount: action.todoCount
            }
            default:
                return state
    }
}

export default count