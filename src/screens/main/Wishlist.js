import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
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
import {removeFromCart} from './../../modules/reducers/cart';

class Cart extends Component {
  state = {
    email: 'marvel@alexius.com',
    password: 'adminadmin',
    isLoading: false,
    errors: null,
  };
  render() {
    console.log(this.props.carts);
    return (
      <ScrollView>
        <Surface style={styles.mainContainer}>
          <Text style={styles.title}>Your cart</Text>
          {this.props.carts.length > 0 ? (
            this.props.carts.map((item, key) => {
              return (
                <Card style={styles.Card} key={key}>
                  <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
                  <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={() => this.props.removeFromCart(item.id)}>
                      Remove from cart
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })
          ) : (
            <Text>Anda belum membeli apapun</Text>
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
  Card: {
    marginVertical: 10,
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  isLogin: state.user.isLogin,
  token: state.user.token,
  carts: state.cart.carts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeFromCart,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
