import React from 'react';
import './style.css';
import ArtChannel from '../../assets/channelArt.jpg';
import { Avatar, Button } from '@material-ui/core';
import { VideoSmall } from '../';

export default function PreviewChannel() {
    return (
        <div className='channel'>
            <img className='channel__art' src={ArtChannel} alt={'channel art'} />
            <div className='channel__details'>
                <div className='channel__detailsWrap'>
                    <div className='channel__avatarWrap'>
                        <Avatar className='channel__avatar' />
                        <div className='videothumb__channel'>
                            <h1 className='channel__title'>Amazon</h1>
                            <p className='videothumb__text watch__subCount'>
                                4.8M Inscritos
                            </p>
                        </div>
                    </div>
                    <Button className='watch__subBtn channel__subBtn' color='primary' variant='contained'>Inscrever-se</Button>
                </div>
                <div className='channel__links'>
                    <div className='channel__link'>
                        <p>HOME</p>
                    </div>
                    <div className='channel__link channel__link--active'>
                        <p>VIDEOS</p>
                        <div className='channel__link__border' />
                    </div>
                    <div className='channel__link'>
                        <p>COMUNIDADE</p>
                    </div>
                    <div className='channel__link'>
                        <p>PLAYLISTS</p>
                    </div>
                    <div className='channel__link'>
                        <p>CANAIS</p>
                    </div>
                    <div className='channel__link'>
                        <p>SOBRE</p>
                    </div>
                </div>
            </div>
            <div className='channel__content'>
                <div className='channel__contentWrapper'>
                    <VideoSmall channelView />
                    <VideoSmall channelView />
                    <VideoSmall channelView />
                    <VideoSmall channelView />
                    <VideoSmall channelView />
                </div>
            </div>
        </div>
    )
}