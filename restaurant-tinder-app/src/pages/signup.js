import React from 'react'

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
        var jsonString = JSON.stringify(this.state);
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

export default SignUp;
