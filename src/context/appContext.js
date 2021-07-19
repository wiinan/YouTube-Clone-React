import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext)
}

export const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [appState, setAppState] = useState('empty');
    const [showUploadVideo, setShowUploadVideo] = useState(false);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setAppState('home')
                setCurrentUser(user)
            } else {
                setCurrentUser('')
                setAppState('login')
            }
        })
    }, [])

    useEffect(() => {
        db.collection('Videos').onSnapshot((snapshot) => {
            setVideos(snapshot.docs.map((doc) => doc.data()
            ))
        })
    })
    const value = { videos, currentUser, appState, showUploadVideo, setShowUploadVideo }
    return <AppContext.Provider value={value} >{children}</AppContext.Provider>
}