import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  Modal,
  ListGroupItem,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { editItem, getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    modal: false,
    name: '',
    price: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  onSubmit = e => {
    e.preventDefault();
// () =>  onSubmit(_id) tuleb lisada
    const newItem = {
      name: this.state.name,
      price: this.state.price
    };

    // Add item via addItem action
    this.props.editItem(newItem);
console.log(newItem);
    // Close modal
    this.toggle();
  };


  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name, price }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>

                  ) : null}

                  {name}
                  <p style={{float: 'right'}}>{price}€</p>

                  {this.props.isAuthenticated ? (
                      <Button onClick={this.toggle}>
                        Muuda
                      </Button>
                  ) : null}
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Uuenda toitu</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                          <Label for='item'>Toit</Label>
                          <Input
                              type='text'
                              name='name'
                              id='item'
                              placeholder='Lisa toit'
                              onChange={this.onChange}
                          />

                          <Label for='price'>Hind</Label>
                          <Input
                              type='text'
                              name='price'
                              id='price'
                              placeholder='Lisa hind'
                              onChange={this.onChange}
                          />
                          <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Uuenda
                          </Button>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                  </Modal>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editItem, getItems, deleteItem }
)(ShoppingList);
