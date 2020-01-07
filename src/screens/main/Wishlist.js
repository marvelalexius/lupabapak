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
import {removeFromWishlist} from './../../modules/reducers/wishlist';

class Wishlist extends Component {
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
          <Text style={styles.title}>Your wishlist</Text>
          {this.props.wishlists.length > 0 ? (
            this.props.wishlists.map((item, key) => {
              return (
                <Card style={styles.Card} key={key}>
                  <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
                  <Card.Content>
                    <Title style={{marginTop: 12}}>{item.name}</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Paragraph style={styles.cardPrice}>
                      Rp{'. '}
                      {item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                    </Paragraph>
                  </Card.Content>
                  <Card.Actions style={{justifyContent: "center"}}>
                    <Button onPress={() => this.props.removeFromWishlist(item.id)}>
                      Remove from wishlist
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })
          ) : (
            <Text style={{textAlign: 'center'}}>
              Tambahkan Barang Impian Anda
            </Text>
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
  wishlists: state.wishlist.wishlists,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeFromWishlist,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wishlist);
