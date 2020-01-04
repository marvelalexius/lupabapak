import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  TextInput,
  Button,
  Surface,
  Card,
  Text,
  Title,
  Paragraph,
  Avatar,
  List,
} from 'react-native-paper';
import url from '../../modules/lib/url';
import axios from 'axios';
import BackdropLoading from './../components/BackdropLoading';

class Support extends Component {
  state = {
    criterias: [],
    criteria_name: null,
    criteria_value: null,
    ahp_criterias: [],
  };
  addCriteria = () => {
    this.setState(state => {
      const criteria = {
        name: state.criteria_name,
        value: state.criteria_value,
      };

      const criterias = [...state.criterias, criteria];

      return {
        criterias,
        criteria_name: null,
        criteria_value: null,
      };
    });
  };

  countAHP = () => {
    
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView>
        <Surface style={styles.mainContainer}>
          <View>
            <Text style={styles.title}>Criteria</Text>
            <TextInput
              label="Criteria Name"
              value={this.state.criteria_name}
              onChangeText={text => this.setState({criteria_name: text})}
              style={styles.formControl}
            />
            <TextInput
              label="Criteria Value"
              value={this.state.criteria_value}
              onChangeText={text => this.setState({criteria_value: text})}
              style={styles.formControl}
            />
            <Button onPress={() => this.addCriteria()}>Submit</Button>
          </View>
          <View>
            {this.state.criterias.map((item, key) => {
              return <List.Item title={item.name + ' = ' + item.value} />;
            })}
            {this.state.criterias.length == 0 ? null : (
              <Button onPress={() => this.countAHP()}>Hitung AHP</Button>
            )}
          </View>
        </Surface>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    marginBottom: 16,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  formControl: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  registerText: {
    textAlign: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
  buttonControl: {
    padding: 10,
    marginVertical: 10,
    // backgroundColor: 'blue',
  },
});

export default Support;
