import { createContext } from "react";

const Store = createContext({
    meetings: [],
    archives: [],
    user: {},
    loading: false,
    error: null,
    getMeetings: () => {},
    archiveMeeting: () => {},
    deleteMeeting: () => {},
    returnFromArchive: () => {},
    loginUser: () => {},
    loggedIn: false
});

export default Store;