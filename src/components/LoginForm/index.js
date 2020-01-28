import React, {Component} from "react"
import "./style.scss"
import axios from "axios";

class LoginForm extends Component {

    state = {
        login: null,
        password: null,
        language: null,
        token: null
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getToken = (e) => {
        e.preventDefault();
        const login = e.target.elements.login.value;
        const password = e.target.elements.password.value;
        const language = e.target.elements.language.value;

        const auth = {
            login: login,
            password: password,
            language: language
        }
        if (login && password && language) {
            axios.post(`/api/identity/login`, auth)
                .then((res) => {
                    const token = res.data.accessToken;
                    this.setState({token: token});
                    console.log(this.state.token);
                })
                .catch(error => console.log(error))
        } else return;
    }

    render() {
        return (
            <div className="login">
                <div className="text">
                    <h1> TMS Beiersdorf </h1>
                    <div> TMS для компании Beiersdorf</div>
                </div>

                <form className="login_form" onSubmit={this.getToken}>
                    <input type="text" placeholder='login' value={this.state.login} name='login'/>
                    <input type='password' placeholder='password' value={this.state.password} name='password'/>
                    <br/>
                    <input type="text" placeholder='language' value={this.state.language} name='language'/>
                    <button type="submit">Войти</button>
                </form>

            </div>
        )
    }
}

export default LoginForm