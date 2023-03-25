type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            const newAge = state.age + 1
            return {...state, age: newAge}
        case 'INCREMENT-CHILDREN-COUNT':
            const newChildrenCount = state.childrenCount + 1
            return {...state, childrenCount: newChildrenCount}
        case 'INCREMENT-NAME':
            return {...state, name: action.newName}
        default:
            throw new Error('I don\'t understand this type')
    }
}