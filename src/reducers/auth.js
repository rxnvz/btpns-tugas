const initialState = {
    isLoggedIn: false,
    users: {},
    userData: [],
    eUser: []
}

const authReducer = (state = initialState, action) => {
    // console.log("state: ", state);
    console.log("action: ", action);

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true,
                users: action.payload.users, 
                userData: action.payload.userList
            }
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                users: {}
            }

        case "REGISTER":
            return {
                ...state,
                userData: [...state.userData, action.payload.dataRegis],
            }

        case "DELETEUSER":
            return {
                ...state,
                userData: state.userData.filter((item, idx) => idx !== action.payload)
            }

        case "EDITUSER":
            return {
                ...state,
                eUser: state.userData.filter((item, index) => index !== action.payload.index),
                userData : [...state.eUser, action.payload.dataUpdate ]
            }
        
        case "FETCH":
            return {
                userData: [...action.payload.userData]
            }

        default:
            return state
    }
}

export default authReducer