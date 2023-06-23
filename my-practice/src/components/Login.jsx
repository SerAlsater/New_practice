import React from 'react';
import './styles/Login.css'
import Header from './Header';
import Footer from './Footer';

const Login = function () {
    return (
        <div>
            <Header/>
            <div className='login'>
                <div className='input_data'>
                    <p className='input_login_name'>Login</p>
                    <input type="text" className='input_login'/>
                    <p className='input_password_name'>Password</p>
                    <input type="password" className='input_password'/>

                    <button className='login_button'>Войти</button>
                </div>
            </div>
            <Footer/>
        </div>
        
    )
};

export default Login;