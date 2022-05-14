import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalContext} from '../../../../state/contexts/GlobalContext';
import {addNewContact} from '../../../../state/actions/global';

export type Props = {
  navigation: any;
};

const Guardian: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const {dispatch} = useContext(GlobalContext);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.headerContainer}>
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="back" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.mainText}>guardians</Text>
        </View>
        <TouchableOpacity>
          <AntDesign
            name="infocirlceo"
            style={[styles.icon, {color: '#9999a5'}]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.endContainer}>
        <TouchableOpacity
          disabled={!name || !address}
          // onPress={() => addContact()}
          style={styles.buttonStyle}>
          <Text
            style={[
              styles.buttonTextStyle,
              {color: !name || !address ? '#9999a5' : 'black'},
            ]}>
            add guardian
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Guardian;
