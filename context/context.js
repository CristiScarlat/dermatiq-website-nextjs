import React from 'react';

export const Ctx = React.createContext();

const initialState = {
    toast: {
        showToast: false,
        type: 'Success',
        headerText: '',
        bodyText: ''
    },
    lang: 'ro'
}

const Provider = ({children}) => {

    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "SET_TOAST":
                return { ...state, toast: action.toast };
            case "SET_LANG":
                return { ...state, lang: action.lang };
            default:
                return state;
        }
    }, initialState)

    return(
        <Ctx.Provider value={{state, dispatch}}>
            {children}
        </Ctx.Provider>
    )
}

export default Provider;