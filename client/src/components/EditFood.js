import React, { Component } from 'react';
import axios from 'axios';

export default class EditFood extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            price: '',
        }
    }

    componentDidMount() {
        axios.get('api/foods/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    price: response.data.price,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        // axios.get('api/foods/')
        //     .then(response => {
        //         if (response.data.length > 0) {
        //             this.setState({
        //                 user: response.data.map(user => user.name),
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const foods = {
            name: this.state.name,
            price: this.state.price,

        };

        console.log(exercise);

        axios.post('/api/foods/' + this.props.match.params.id, foods)
            .then(res => console.log(res.data));

    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">

                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}