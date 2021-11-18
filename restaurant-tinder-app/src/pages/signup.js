import React from 'react'
import axios from 'axios'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let key = event.target.name;
        this.setState({
            [key]: event.target.value
        });
        return;
    }

    handleSubmit(event) {
        let username = this.state.username;
        let password = this.state.password;
        let messages = [];
        const errorElement = document.getElementById('error');

        // username validation
        if (username === '' || username == null) {
            messages.push('username is required');
        }
        
        // password validation
        if (password === '' || password == null) {
            messages.push('password is required');
        } else if (password.length > 4) {
            messages.push('password must be between 0 and 4 characters');
        }

        if (messages.length > 0) {
            event.preventDefault();
            errorElement.innerText = messages.join(', ');
            alert(messages.join(', '));
        } else {
            var jsonString = JSON.stringify(this.state);
            alert(jsonString);
            event.preventDefault();
        }
        var jsonString = JSON.stringify(this.state);

        var userinfo = this.state;

        //get all queries that match username
        let checkUser = function(username){
            return axios.get("http://localhost:3001/find/User/" + username)
            .then(response => {return response.data})
        };

        let users = checkUser(this.state.username);
        users.then(function(result){
            //output for debugging
            console.log(result)
            //no user exists so add to DB
            if (result === undefined || result.length == 0){
                axios
                .post("http://localhost:3001/record/User", userinfo)
                .then((res) => console.log(res.data));
            }
            else{
                //user already exists
            }

        })

        alert(jsonString);
        event.preventDefault();
        
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </label>   
                        <input type="submit" value="Submit" />
                    </form>
                    <div id='error'></div>
                </div>
            </div>
        );
    }
}

export default SignUp;
