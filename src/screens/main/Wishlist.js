import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  Button,
  Surface,
  Card,
  Text,
  Title,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';

import axios from 'axios';
import url from '../../modules/lib/url';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Wishlist extends Component {
  state = {
    wishlists: [],
    isLoading: true,
  };

  componentDidMount() {
    this._getWishlist();
  }

  render() {
    return (
      <ScrollView>
        <Surface style={styles.mainContainer}>
          {this.state.isLoading ? (
            <View>
              <ActivityIndicator animating={true} />
            </View>
          ) : null}
          <Text style={styles.title}>Your wishlist</Text>
          {this.state.wishlists.length > 0 ? (
            this.state.wishlists.map((item, key) => {
              return (
                <Card style={styles.Card} key={key}>
                  <Card.Cover
                    source={{
                      uri: `${url}/storage/${item.image}`,
                    }}
                  />
                  <Card.Content>
                    <Title style={{marginTop: 12}}>{item.name}</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Paragraph style={styles.cardPrice}>
                      Rp{'. '}
                      {item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                    </Paragraph>
                  </Card.Content>
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

  _getWishlist = () => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token,
      },
    };

    const Url = `${url}/api/wishlist?user_id=${this.props.user.id}`;
    axios.get(Url, config).then(res => {
      this.setState({wishlists: res.data.data, isLoading: false});
    });
  };
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
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wishlist);
