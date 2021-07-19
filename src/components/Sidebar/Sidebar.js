import { ExpandMore, Home, OndemandVideo, Restore, Subscriptions, ThumbUp, VideoLibrary, WatchLater, Whatshot } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

export default function Sidebar({ changeWidth }) {
    const history = useHistory()
    const handleClick = () => history.push('/')
    return (
        <div className={`sidebar ${changeWidth && 'sidebar__extraWidth'}`}>
            <div className='sidebar__buttons'>
                <div onClick={handleClick} className='sidebar__btn sidebar__btn--active'>
                    <Home className='sidebar__icon' />
                    <p>Inicio</p>
                </div>
                <div className='sidebar__btn'>
                    <Whatshot className='sidebar__icon' />
                    <p>Populares</p>
                </div>
                <div className='sidebar__btn'>
                    <Subscriptions className='sidebar__icon' />
                    <p>inscricoes</p>
                </div>
            </div>
            <div className='sidebar__buttons bottom'>
                <div className='sidebar__btn'>
                    <VideoLibrary className='sidebar__icon' />
                    <p>Biblioteca</p>
                </div>
                <div className='sidebar__btn'>
                    <Restore className='sidebar__icon' />
                    <p>Historico</p>
                </div>
                <div className='sidebar__btn'>
                    <OndemandVideo className='sidebar__icon' />
                    <p>Seus videos</p>
                </div>
                <div className='sidebar__btn'>
                    <WatchLater className='sidebar__icon' />
                    <p>Assistir depois</p>
                </div>
                <div className='sidebar__btn'>
                    <ThumbUp className='sidebar__icon' />
                    <p>Videos Curtidos</p>
                </div>
                <div className='sidebar__btn'>
                    <ExpandMore className='sidebar__icon' />
                    <p>Mostrar mais</p>
                </div>
            </div>
        </div>
    )
}