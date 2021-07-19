import React from 'react';
import { useAppContext } from '../../context/appContext';
import './style.css';
import VideoThumb from './VideoThumb';

const Main = (() => {
    const { videos } = useAppContext()
    return (
        <div className='main'>
            {videos.map((video) => (
                <VideoThumb video={video} />
            ))}
        </div>
    )
})

export default Main;