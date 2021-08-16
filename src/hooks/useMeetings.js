import { useCallback, useState } from "react";
import { useFetch } from "./useFetch";

export const useMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [archives, setArchives] = useState([]);
    const [fetchedOnce, setFetchedOnce] = useState(false);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const { fetchHandler, loading, error } = useFetch();

    const getMeetings = useCallback((history) => {
        if (!fetchedOnce) {
            fetchHandler("meetings.json").then(res => {
                if (res.length === 0) return history.push("/profile");
                for (const meeting of res) {
                    meeting.date = new Date(meeting.date).toLocaleDateString().replace(/[.]/g, "/");
                    meeting.meetingLength = new Date(meeting.meetingLength * 1000).toISOString().substr(14, 5);
                }
                setMeetings(res);
                setFetchedOnce(true);
            });
        }
    }, [fetchHandler, fetchedOnce]);

    const archiveMeeting = useCallback((name) => {
        const foundMeeting = meetings.find(item => item.name === name);
        if (foundMeeting !== undefined) {
            setMeetings(prevState => prevState.filter(item => item.name !== name));

            foundMeeting.date = new Date().toLocaleDateString().replace(/[.]/g, "/");
            setArchives(prevState => [...prevState, foundMeeting]);

            if (loggedIn) {
                setUser(prevState => ({
                    ...prevState,
                    completedMeetings: user.completedMeetings++,
                    payment: user.payment += foundMeeting.price
                }));
            }
        }
    }, [meetings, user, loggedIn]);

    const returnFromArchive = useCallback((name) => {
        const foundMeeting = archives.find(item => item.name === name);
        if (foundMeeting !== undefined) {
            setMeetings(prevState => [...prevState, foundMeeting]);
            setArchives(prevState => prevState.filter(item => item.name !== name));

            if (loggedIn) {
                setUser(prevState => ({
                    ...prevState,
                    completedMeetings: user.completedMeetings--,
                    payment: user.payment -= foundMeeting.price
                }));
            }
        }
    }, [archives, loggedIn, user]);

    const deleteMeeting = useCallback((name) => {
        setMeetings(prevState => prevState.filter(item => item.name !== name));
    }, []);

    const loginUser = useCallback((data) => {
        setUser(data);
        setLoggedIn(true);
    }, []);

    return {
        meetings,
        loading,
        error,
        getMeetings,
        archiveMeeting,
        archives,
        returnFromArchive,
        deleteMeeting,
        loginUser,
        loggedIn,
        user
    };
};