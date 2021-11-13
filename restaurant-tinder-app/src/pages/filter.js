import React from 'react'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            category: '',
            price: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let key = event.target.name;
        // this.setState({key: event.target.value});
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
                        Term:
                        <input
                            type="text"
                            name="term"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            onChange={this.handleChange}
                        />
                    </label>        
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            onChange={this.handleChange}
                        />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Filter;