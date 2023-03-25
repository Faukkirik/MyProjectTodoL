import {userReducer} from './user-reducer'

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
    expect(endState).not.toBe(startState)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
    expect(endState).not.toBe(startState)
})

test('user reducer should change name of user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const newName = 'Victor'

    const endState = userReducer(startState, {type: 'INCREMENT-NAME', newName: newName})

    expect(endState.name).toBe('Victor')
    expect(endState.age).toBe(20)
    expect(endState).not.toBe(startState)
})
