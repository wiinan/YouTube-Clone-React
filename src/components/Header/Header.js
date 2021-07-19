import React, { useState } from 'react';
import './styles.css';
import { Menu, Search, VideoCall, Apps, Notifications, CameraAltOutlined, PersonAddOutlined } from '@material-ui/icons';
import { Button, Avatar, Popover, Badge, makeStyles } from '@material-ui/core';
import logo from '../../assets/logo1.png';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { auth } from '../../lib/firebase';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}))

export default function Header() {
    const [enchorEl, setEnchorEl] = useState(null);
    const classes = useStyles();
    const { showUploadVideo, setShowUploadVideo } = useAppContext()
    const handleClick = (event) => {
        setEnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setEnchorEl(null)
    }
    const open = Boolean(enchorEl)
    const id = open ? 'simple-popover' : undefined
    const history = useHistory();
    const handleHomeClick = () => history.push('/#')
    const { currentUser } = useAppContext()
    return (
        <div className='header'>
            <div className='header__left'>
                <Menu className='header__menuicon' />
                <img className='header__logo' src={logo} alt='Youtube' onClick={handleHomeClick} />
            </div>
            <form className='header__center'>
                <input className='header__input' placeholder='search' />
                <Button className='header__btn'>
                    <Search className='header__searchIcon' />
                </Button>
            </form>
            <div className='header__right'>
                <VideoCall onClick={() => setShowUploadVideo(!showUploadVideo)} />
                <Apps />
                <Notifications />
                <Avatar onClick={handleClick} />
                <Popover open={open} id={id} onClose={handleClose} anchorEl={enchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top' }}>
                    <div className='home__popoverContainer'>
                        <div className='home__popover__top'>
                            <Badge overlap='circle' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<div className='home__badge'><CameraAltOutlined className='home__camera' /></div>}>
                                <Avatar className={classes.large} />
                            </Badge>
                            <div className='home__text'>
                                <div className='home__displayName'>{currentUser.displayName}</div>
                                <div className='home__mail'>{currentUser.email}</div>
                            </div>
                            <div className='home__btn'>Gerencia Conta Google</div>
                            <div className='home__popover__btm'>
                                <div className='home__addBtn'>
                                    <PersonAddOutlined className='home__addIcon' />
                                    <p>Adicionar outra conta</p>
                                </div>
                                <Button onClick={() => auth.signOut()} className='home__signOut' variant='outlined'>
                                    Sign Out
                                </Button>
                                <div className='home__popover__footer'>
                                    <p>Politica de Privacidade</p><span>*</span><p>Termos e Serviços</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    )
}