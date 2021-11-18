import React from 'react'
import axios from 'axios'

class SignIn extends React.Component {
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
        var jsonString = JSON.stringify(this.state);

        var userinfo = this.state;

        //get all queries that match username and password
        let checkUser = function(username,pass){
            return axios.get("http://localhost:3001/find/UserInfo/" + username + 
            "/" + pass)
            .then(response => {return response.data})
        };

        let users = checkUser(this.state.username, this.state.password);
        users.then(function(result){
            console.log(result)

            if (result === undefined || result.length == 0){
                //invalid input
            }
            else
            {
                //it was valid input, so do stuff
            }

        })

        alert(jsonString);
        event.preventDefault();
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
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
            </div>
        );
    }
}

export default SignIn;
