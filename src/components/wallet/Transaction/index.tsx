import {View, Text} from 'react-native';
import React from 'react';
import moment from 'moment';

const Transaction = ({item}: {item: any}) => {
  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={{
          color: 'white',
          textTransform: 'lowercase',
          marginBottom: 14,
          fontFamily: 'SpaceMono-Bold',
        }}>
        {moment(item.date).format('DD MMM yyyy')}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}>
          <Text style={{fontFamily: 'Poppins-Bold'}}>ap</Text>
        </View>
        <View>
          <Text
            style={{
              color: '#cacaca',
              textTransform: 'lowercase',
              fontFamily: 'SpaceMono-Bold',
            }}>
            from
          </Text>
          <Text
            style={{
              color: 'white',
              textTransform: 'lowercase',
              fontFamily: 'SpaceMono-Bold',
            }}>
            {item.username}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Transaction;
