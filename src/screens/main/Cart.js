import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Button,
  Surface,
  Card,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';

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
                    <Title style={styles.cardName}>{item.name}</Title>
                    <Paragraph style={styles.cardPrice}>
                      Rp{'. '}
                      {item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,'$1,')}
                    </Paragraph>
                  </Card.Content>
                  <Card.Actions style={{justifyContent: "center"}}>
                    <Button onPress={() => this.props.removeFromCart(item.id)}>
                      Remove from cart
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })
          ) : (
            <Text style={{textAlign: "center"}}>Anda belum membeli apapun</Text>
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
  cardName: {
    marginTop: 12,
    textAlign: 'center',
  },
  cardPrice: {
    marginTop: 12,
    textAlign: 'center',
    fontWeight: 'bold',
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
