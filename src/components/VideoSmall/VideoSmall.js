import React from 'react';
import './style.css';
import thumb from '../../assets/thumb.jpg';
import { useHistory } from 'react-router-dom';

export default function VideoSmall({ channelView }) {
    const history = useHistory();
    const handleClickRedirect = () => history.push('/watch');
    return (
        <div onClick={handleClickRedirect} className={`videoSmall ${channelView && 'videoSmall__channelView'}`}>
            <div className='videoSmall__left'>
                <img src={thumb} alt='thumbnail' className={`videoSmall__thumbmail ${channelView && 'videoSmall__channelView__img'}`} />
            </div>
            <div className='videoSmall__right'>
                <p className='videoSmall__title'>
                    Amazon Prime videos
                </p>
                <div className='videoSmall__texts videothumb__texts'>
                    {!channelView && (<p className='videothumb__text'>Amazon</p>)}

                    <p className='videothumb__text'>110k views * 3 dias atras</p>
                </div>
            </div>
        </div>
    )
}