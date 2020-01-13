import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Surface, Text} from 'react-native-paper';

import ProductCard from './ProductCard';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {productRequest} from '../../modules/reducers/product';
import {addToCart} from './../../modules/reducers/cart';

class Home extends Component {
  state = {
    email: 'marvel@alexius.com',
    password: 'adminadmin',
    isLoading: false,
    errors: null,
  };
  componentDidMount() {
    this.props.productRequest();
  }
  render() {
    return (
      <ScrollView>
        <Surface style={styles.mainContainer}>
          <Text style={styles.title}>LupaBapak</Text>
          {this.props.products.map((item, key) => {
            return (
              <ProductCard
                product={item}
                key={key}
                navigation={this.props.navigation}
              />
            );
          })}
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
  products: state.product.products,
  isRequestingProducts: state.product.isRequestingProducts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      productRequest,
      addToCart,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
