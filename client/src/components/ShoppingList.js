import React, { Component } from "react";
import {
  Container,
  ListGroup,
  Modal,
  ListGroupItem,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
// import { tokenConfig } from '../actions/authActions';
import { editItem, getItems, deleteItem } from "../actions/itemActions";
import axios from "axios";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    items: [],
    editFoodData: {
      id: "",
      name: "",
      price: ""
    },
    editFoodModal: false
  };

  toggleEditFoodModal() {
    this.setState({
      editFoodModal: !this.state.editFoodModal
    });
  }

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  updateFood() {
    let { name, price } = this.state.editFoodData;
    const token = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:5000/api/foods/" + this.state.editFoodData.id,
        {
          name,
          price
        },
        {
          headers: {
            "x-auth-token": token
          }
        }
      )
      .then(response => {
        console.log(response);
        this._refreshFood();
        this.setState({
          editFoodModal: false,
          editFoodData: { id: "", name: "", price: "" }
        });
      });
  }

  editFood(id, name, price) {
    this.setState({
      editFoodData: { id, name, price },
      editFoodModal: !this.state.editFoodModal
    });
  }

  _refreshFood() {
    axios.get("http://localhost:5000/api/foods").then(response => {
      this.setState({
        items: response.data
      });
    });
  }

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, price }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                  {this.props.isAuthenticated ? (
                    <Button
                      style={{ float: "right" }}
                      onClick={this.editFood.bind(this, _id, name, price)}
                    >
                      Muuda
                    </Button>
                  ) : null}
                  <p style={{ float: "right", marginRight: "5px" }}>{price}€</p>

                  <Modal
                    isOpen={this.state.editFoodModal}
                    toggle={this.toggleEditFoodModal.bind(this)}
                  >
                    <ModalHeader toggle={this.toggleEditFoodModal.bind(this)}>
                      Muuda toitu
                    </ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Label for="title">Name</Label>
                        <Input
                          id="item"
                          value={this.state.editFoodData.name}
                          onChange={e => {
                            let { editFoodData } = this.state;

                            editFoodData.name = e.target.value;

                            this.setState({ editFoodData });
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="rating">Price</Label>
                        <Input
                          id="item"
                          value={this.state.editFoodData.price}
                          onChange={e => {
                            let { editFoodData } = this.state;

                            editFoodData.price = e.target.value;

                            this.setState({ editFoodData });
                          }}
                        />
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={this.updateFood.bind(this)}
                      >
                        Uuenda toitu
                      </Button>{" "}
                      <Button
                        color="secondary"
                        onClick={this.toggleEditFoodModal.bind(this)}
                      >
                        X
                      </Button>
                    </ModalFooter>
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
  items: state,
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editItem, getItems, deleteItem }
)(ShoppingList);
