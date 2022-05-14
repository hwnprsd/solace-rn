import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import styles from './styles';

export type Contact = {
  name: string;
  username: string;
  address: string;
};

export type Props = {
  contact: Contact;
};

const Contact: React.FC<Props> = ({contact}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>
            {contact.name
              .split(' ')
              .map(word => word[0])
              .join('')
              .toLowerCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.username}>{contact.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;
