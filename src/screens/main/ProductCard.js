import React, {Component} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {
  TextInput,
  Button,
  Surface,
  Card,
  Text,
  Title,
  Paragraph,
  Avatar,
} from 'react-native-paper';
import url from '../../modules/lib/url';
import axios from 'axios';
import BackdropLoading from './../components/BackdropLoading';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addToCart} from './../../modules/reducers/cart';

class ProductCard extends Component {
  render() {
    return (
      <Card style={styles.Card}>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Content>
          <Title>{this.props.product.name}</Title>
          <Paragraph>{this.props.product.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this._buyNow(this.props.product)}>
            Buy Now
          </Button>
          <Button onPress={() => this._addToCart(this.props.product)}>
            Add To Cart
          </Button>
          <Button onPress={() => this._addToWishlist(this.props.product)}>
            Add To Wishlist
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  _addToCart(product) {
    let carts = [];
    let cart = {
      ...product,
      quantity: 1,
    };
    carts.push(cart);
    this.props.addToCart(carts);
  }

  _buyNow(product) {
    let carts = [];
    let cart = {
      ...product,
      quantity: 1,
    };
    carts.push(cart);
    console.log(carts);

    let {token} = this.props;
    const Url = `${url}/api/transaction`;
    console.log(Url);

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    axios
      .post(Url, carts, config)
      .then(res => {
        Alert.alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }

  _addToWishlist(product) {
    let {token, user} = this.props;
    const Url = `${url}/api/wishlist`;
    console.log(Url);

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    let data = {
      user_id: user.id,
      product_id: product.id,
    };

    axios
      .post(Url, data, config)
      .then(res => {
        Alert.alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  Card: {
    marginVertical: 10,
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  isLogin: state.user.isLogin,
  token: state.user.token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToCart,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductCard);
