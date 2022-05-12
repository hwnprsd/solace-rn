import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: 'white',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 28,
  },
  priceText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  usernameText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;
