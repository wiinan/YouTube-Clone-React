import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import './style.css';
import { auth } from '../../lib/firebase'

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function Signup({ setShowSignUp }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false)
    const [passwordError, setPasswordError] = useState({ state: false, msg: "" })
    const [emailError, setEmailError] = useState({ state: false, msg: '' })

    const toogleSignUp = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSignUp(false);
        }, 3000)
    }
    const CreateAccount = (e) => {
        e.preventDefault();
        setLoading(true)
        const error = formData.password === formData.confirmPassword
        if (formData.firstName === '' || formData.lastName === '') {
            setLoading(false)
            setPasswordError({ state: false, msg: '' })
            setEmailError({ state: true, msg: "Digite um nome e sobrenome" })
            return
        }
        else if (!error) {
            setPasswordError({ state: true, msg: 'Senhas nao iguais' })
            setFormData({ ...formData, confirmPassword: "" })
            setLoading(false)
            return
        } else {
            setPasswordError({ state: false, msg: '' })
            setEmailError({ state: false, msg: '' })
            setLoading(true)
        }
        auth.createUserWithEmailAndPassword(formData.email, formData.password).then(() => {
            auth.currentUser.updateProfile({
                displayName: `${formData.firstName} ${formData.lastName}`,
            }).then(() => {
                setLoading(false)
                setEmailError({ state: false, msg: '' })
                setPasswordError({ state: false, msg: '' })
            })
        }).catch((err) => {
            console.log(err)
            if (err.code === 'auth/invalid-email') {
                setLoading(false)
                setPasswordError({ state: false, msg: '' })
                setEmailError({ state: true, msg: 'Email Invalido' })
                setFormData({ ...formData, email: '' })
            } else if (err.code === 'auth/weak-password') {
                setLoading(false)
                setPasswordError({ state: true, msg: 'Senha Fraca' })
            } else if (err.code === 'auth/email-already-in-use') {
                setLoading(false)
                setPasswordError({ state: false, msg: '' })
                setEmailError({ state: true, msg: 'Email em uso' })
                setFormData({ ...formData, email: "" })
            }
        })
    }

    const disabled = !formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword

    return (
        <div className='signup__container'>
            <div className={`signup ${loading && 'login__fade'}`}>
                {loading && <div className='login__loading signup__loading' />}
                <div className='signup__container'>
                    <div className='signup__left'>
                        <img className='login__logo' src='http://www.google.co.uk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' alt='Google' />
                        <p className='login__title'>Crie sua conta</p>
                        <p className='login__subtitle'>Continue no Youtube</p>
                        <div className='signup__inputs'>
                            <div className='signup__nameInputs'>
                                <TextField id="outlined-basic" className='signup__nameInput' label="Primeiro Nome" variant="outlined" type='name' value={formData.firstName} onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }) }} />
                                <TextField id='outlined-basic' className='signup__nameInput' label='Ultimo Nome' variant='outlined' type='name' value={formData.lastName} onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }} />
                            </div>
                            <TextField id='outlined-basic' label='Email' type='email' variant='outlined' fullWidth helperText={emailError.state ? emailError.msg : 'Pode usar letras especiais e numeros'} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={emailError.state} />
                            <div className='signup__passwordInput'>
                                <div className='signup__passwordWrapper'>
                                    <TextField id='outlined-basic' label='Senha' type={showPassword ? 'text' : 'password'} variant='outlined' className='signup__passwordInput' value={formData.password} onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} error={passwordError.state} />
                                    <TextField id='outlined-basic' label='Repita a Senha' type={showPassword ? 'text' : 'password'} variant='outlined' className='signup__passwordInput' value={formData.confirmPassword} onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }) }} error={passwordError.state} />
                                </div>
                                <p className={`signup__helpertext ${passwordError.state && 'signin__error'}`}>{passwordError.state ? passwordError.msg : 'Use Senha com 8 caracteres ou mais, letras especiais e numeros'}</p>
                                <FormControlLabel control={<Checkbox color='primary' checked={showPassword} onClick={() => setShowPassword(!showPassword)} />} label='Show Password' />
                            </div>
                            <div className='signup__buttons'>
                                <Button className='signup__button' variant='text' color='primary' onClick={toogleSignUp}>Já possui conta?</Button>
                                <Button className='signup__button' variant='contained' color='primary' onClick={CreateAccount} disabled={disabled}>Registrar</Button>
                            </div>
                        </div>
                    </div>
                    <figure className='signup__figure'>
                        <img className='signup__figureImg' src='https://ssl.gstatic.com/accounts/signup/glif/account.svg' alt='account' />
                    </figure>
                    <figcaption className='signup__figcaption'>
                        One account. All of Google working for you
                    </figcaption>
                </div>
            </div>
        </div>
    )
}