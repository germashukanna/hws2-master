const initState = {
    themeId: 1,
}

type initStateType = typeof initState

export const themeReducer = (state: initStateType = initState, action: LoadingActionType): initStateType => { // fix any
    switch (action.type) {
        case "SET_THEME_ID":
            return {...state, themeId: action.id}

        default:
            return state
    }
}

type LoadingActionType = {
    type: 'SET_THEME_ID'
    id: number
}

export const changeThemeId = (id: number): LoadingActionType => ({ type: 'SET_THEME_ID', id }) // fix any
