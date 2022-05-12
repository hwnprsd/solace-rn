import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  headingContainer: {
    flex: 0.5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: 'white',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 28,
  },
  price: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  username: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  buttonsContainer: {
    flex: 1,
    width: '60%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    marginTop: 12,
  },
  walletContainer: {
    flex: 1,
    marginTop: 40,
    width: '90%',
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  sideHeading: {
    color: '#9999A5',
    fontSize: 14,
    fontFamily: 'SpaceMono-Bold',
  },
});

export default styles;
