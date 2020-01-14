import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import url from '../../modules/lib/url';
import axios from 'axios';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addToCart} from './../../modules/reducers/cart';

class ProductCard extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <Card.Cover
          source={{uri: `${url}/storage/${this.props.product.image}`}}
        />
        <Card.Content>
          <Title style={{marginTop: 12}}>{this.props.product.name}</Title>
          <Paragraph>{this.props.product.description}</Paragraph>
          <Paragraph style={styles.cardPrice}>
            Rp{'. '}
            {this.props.product.price.replace(
              /(\d)(?=(\d\d\d)+(?!\d))/g,
              '$1,',
            )}
          </Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <Button onPress={() => this._buyNow(this.props.product)}>
            Buy Now
          </Button>
          <Button onPress={() => this._addToCart(this.props.product)}>
            Add To Cart
          </Button>
          <Button
            icon="bookmark-plus-outline"
            onPress={() => this._addToWishlist(this.props.product)}
          />
        </Card.Actions>
      </Card>
    );
  }

  _addToCart(product) {
    let cart = {
      ...product,
      quantity: 1,
    };
    this.props.addToCart(cart);
  }

  _buyNow(product) {
    // this.props.navigation.navigate('WebViewScreen', {
    //   uri: `${url}/api/payment/transaction/9B6Eg`,
    // });

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
        this.props.navigation.navigate('WebViewScreen', {
          uri: `${url}/api/payment/transaction/${res.data.data}`,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _addToWishlist(product) {
    let {token} = this.props;
    const Url = `${url}/api/wishlist`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    let data = [product];
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
  card: {
    marginVertical: 10,
  },
  cardAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardPrice: {
    marginTop: 12,
    textAlign: 'right',
    fontWeight: 'bold',
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
