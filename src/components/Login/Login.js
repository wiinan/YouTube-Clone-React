import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Signup } from '../index';
import { auth } from '../../lib/firebase';
import './style.css';


export default function Login() {
    const [loading, setLoading] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [mailError, setMailError] = useState({ state: false, msg: '' });
    const [passwordError, setPasswordError] = useState({ state: false, msg: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toogleSignUp = (e) => {
        e.preventDefault()
        setLoading(true);
        setTimeout(() => {
            setShowSignUp(!showSignUp);
            setLoading(false);
        }, 500);
    }
    const signin = (e) => {
        e.preventDefault()
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setPasswordError({ state: false, msg: '' })
            setMailError({ state: false, msg: '' })
            console.log(auth)
        }).catch((err) => {
            setLoading(false);
            if (err.code === 'auth/wrong-password') {
                setMailError({state: false, msg: ''})
                setPasswordError({ state: true, msg: 'Senha Invalida' })
            } else if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found') {
                setMailError({state:true, msg:'Email Invalido'})
                setPasswordError({state: false, msg: ''})
            }
        })
    }
    return (
        <div className='login'>
            {showSignUp ? (<Signup setShowSignUp={setShowSignUp} />) : (
                <div className='login__content'>
                    {loading && <div className='login__loading' />}
                    <div className={`login__wrapper ${loading && 'login__fade'}`}>
                        <img className='login__logo' src='http://www.google.co.uk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' alt='Google' />
                        <p className='login__title'>Login</p>
                        <p className='login__subtitle'>Continue no Youtube</p>
                        <form className='login__form'>
                            <TextField id='outlined-basic' label='Email' variant='outlined' className='login__input' error={mailError.state} type='email' value={email} onChange={(e) => setEmail(e.target.value)} helperText={mailError.msg} />
                            <TextField id='outlined-basic' label='Senha' variant='outlined' className='login__input' error={passwordError.state} type='password' value={password} onChange={(e) => setPassword(e.target.value)} helperText={passwordError.msg} />
                            <div className='login__infoText'>
                                Nao esta usando seu PC? logar em guia privada?
                                <a target='_blank' href='/learnmore'>Leia Mais</a>
                            </div>
                            <div className='login__buttons'>
                                <Button className='login__button' color='primary' onClick={toogleSignUp}>Criar Conta</Button>
                                <Button className='login__button' color='primary' variant='contained' onClick={signin} >Logar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}