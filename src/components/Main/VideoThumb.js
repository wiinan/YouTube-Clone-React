import { Avatar } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function VideoThumb({ video }) {
    const history = useHistory();
    const handleThumbClick = () => history.push(`/watch/${video.id}`)
    const handleAvatarClick = () => history.push('/PreviewChannel')
    const formattedDate = moment.unix(video?.timestamp?.seconds).format('YYYYMMDD, HH:mm:ss')
    const uploadedTime = moment(formattedDate, 'YYYYMMDD, HH:mm:ss').fromNow()
    return (
        <div className='videothumb'>
            <img className='videothumb__thumbnail' src={video.thumbnailURL} alt='thumnail' onClick={handleThumbClick} />
            <div className='videothumb__details'>
                <Avatar onClick={handleAvatarClick} />
                <div className='videothumb__channel'>
                    <h1 className='videothumb__title' onClick={handleThumbClick} >
                        {video.title}
                    </h1>
                    <div className='videothumb__texts'>
                        <p className='videothumb__text' onClick={handleAvatarClick}>{video.channelName}</p>
                        <p className='videothumb__text'>123 view * {uploadedTime} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}