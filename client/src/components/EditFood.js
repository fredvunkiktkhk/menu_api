import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Form, FormGroup, Input, Button, ModalBody, ModalHeader} from "reactstrap";

class EditFood extends Component {

    handleEdit = (e) => {
        e.preventDefault();
        const newName = this.getName.value;
        const newPrice = this.getPrice.value;
        const data = {
            newName,
            newPrice
        };
        this.props.dispatch({type: 'UPDATE', id: this.props.item.id, data: data});
    };

    render() {
        return (

            <Form  className="form" onSubmit={this.handleEdit}>
                <FormGroup>
                        <input ref={(input) => this.getName = input}

                               placeholder="Enter name"/>
                        <br/>
                        <br/>
                        <input ref={(input) => this.getPrice = input}
                                placeholder="Enter price"/>
                        <br/>
                        <br/>
                        <Button>Update</Button>
                </FormGroup>
            </Form>

        );
    }
}

export default connect()(EditFood);