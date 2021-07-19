import React, { useState } from 'react';
import moment from 'moment'
import './style.css';
import { Reply, ThumbDownAlt, ThumbUpAlt, PlaylistAdd, MoreHoriz } from '@material-ui/icons';
import { Avatar, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { VideoSmall } from '../index';

export default function Watch({ video }) {
    const history = useHistory();
    const handleAvatarClick = () => history.push('/PreviewChannel')
    const [showDesc, setShowDesc] = useState(false)
    const formatted = moment.unix(video?.timestamp?.seconds).format('MMM DD, YYYY')
    return (
        <div className='watch'>
            <div className='watch__wrap'>
                <div className='watch__left'>
                    <video className='watch__video' autoplay controls>
                        <source src={video.videoURL} type='video/mp4' />
                    </video>
                    <div className='watch__leftBtm'>
                        <h1 className='watch__title'>{video.title}</h1>
                        <div className='watch__videoInfo'>
                            <div className='watch__videoInfoLeft'>
                                <p className='videothumb__text'>123 view * {formatted}</p>
                            </div>
                            <div className='watch__videoInfoRight'>
                                <div className='watch__linkContainer'>
                                    <div className='watch__likeWrap'>
                                        <div className='watch__likeBtnContainer color--gray'>
                                            <ThumbUpAlt className='watch__icon' />
                                            <p>15k</p>
                                        </div>
                                        <div className='watch__likeBtnContainer color--gray'>
                                            <ThumbDownAlt className='watch__icon' />
                                            <p>100</p>
                                        </div>
                                    </div>
                                    <div className='watch__likeDislikes' />
                                </div>
                                <div className='watch__likeBtnContainer color--gray'>
                                    <Reply className='watch__icon share-icon' />
                                    <p>COMPARTILHAR</p>
                                </div>
                                <div className='watch__likeBtnContainer color--gray'>
                                    <PlaylistAdd className='watch__icon play-addIcon' />
                                    <p>SALVAR</p>
                                </div>
                                <div className='watch__likeBtnContainer color--gray'>
                                    <MoreHoriz className='watch__icon play--addIcon' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='watch__details'>
                        <div className='watch__detailsContainer'>
                            <div className='videothumb__details watch__avatarWrap'>
                                <Avatar style={{ cursor: 'pointer' }} onClick={handleAvatarClick} />
                                <div className='videothumb__channel'>
                                    <h1 className='videothumb__title' onClick={handleAvatarClick}>
                                        {video.channelName}
                                    </h1>
                                    <p className='videothumb__text watch__subCount'>4.5M Subscribe</p>
                                </div>
                            </div>
                            <Button className='watch__subBtn' color='primary' variant='contained'>inscrever-se</Button>
                        </div>
                        <div className='watch__description'>
                            <p style={{ maxHeight: showDesc && '100%' }}>{video.description}</p>
                            <p className='watch__showMore' onClick={() => setShowDesc(!showDesc)}>Mostrar {showDesc ? 'menos' : 'mais'}</p>
                        </div>
                    </div>
                </div>
                <div className='watch__right'>
                    <VideoSmall />
                    <VideoSmall />
                    <VideoSmall />
                    <VideoSmall />
                    <VideoSmall />
                </div>
            </div>
        </div>
    )
}