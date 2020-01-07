import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Surface, Text, Button} from 'react-native-paper';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Checkout extends Component {
  state = {
    email: 'marvel@alexius.com',
    password: 'adminadmin',
    isLoading: false,
    errors: null,
  };

  render() {
    let totalPrice = this.props.carts.reduce((total, item) => {
      return total + parseInt(item.price, 10);
    }, 0);

    return (
      <ScrollView>
        <Surface style={styles.mainContainer}>
          <Text style={styles.title}>Payment</Text>
          <Text style={{textAlign: "center"}}>List item yang anda beli</Text>
          <View style={{marginTop: 32}}>
            {this.props.carts.length > 0 ? (
              this.props.carts.map((item, key) => {
                return (
                  <View style={{marginTop: 12}} key={key}>
                    <Text style={styles.price}>{item.name}</Text>
                    <Text style={styles.priceTag}>
                      Rp{'. '}
                      {item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={{textAlign: "center"}}>Keranjang anda kosong</Text>
            )}
          </View>
          {totalPrice > 0 ? (
            <View>
              <View style={styles.priceTotal}>
                <Text style={{fontSize: 24, fontWeight: "bold"}}>total</Text>
                <Text style={styles.priceTag}>
                  Rp{'. '}
                  {totalPrice
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                  {'.00'}
                </Text>
              </View>
              <Button icon="cube-send" mode="contained" style={{marginTop: 36}}>
                Bayar
              </Button>
            </View>
          ) : (
            <View />
          )}
        </Surface>
      </ScrollView>
    );
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
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceTag: {
    textAlign: 'right',
  },
  priceTotal: {
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
    marginTop: 24,
    paddingTop: 12,
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  isLogin: state.user.isLogin,
  token: state.user.token,
  carts: state.cart.carts,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
