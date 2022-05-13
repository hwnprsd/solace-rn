import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '90%',
  },
  inputContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
  },
  icon: {
    color: 'white',
    fontSize: 24,
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    width: 40,
    overflow: 'hidden',
    marginRight: 20,
    // backgroundColor: '#3d3d3d',
  },
  giftIcon: {
    color: 'white',
    fontSize: 24,
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    width: 40,
    overflow: 'hidden',
    marginRight: 6,
  },
  headingContainer: {
    flex: 0.5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 35,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  mainText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
  price: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  username: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 8,
    fontSize: 18,
  },
  buttonsContainer: {
    flex: 1,
    width: '70%',
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
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    fontFamily: 'SpaceMono-Regular',
  },
  sendContainer: {
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
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  contactImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  secondaryText: {
    textDecorationLine: 'underline',
    color: 'white',
    fontFamily: 'SpaceMono-Bold',
  },
  textInput: {
    width: '100%',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    color: 'white',
    padding: 14,
    paddingLeft: 40,
    borderWidth: 1,
    fontFamily: 'SpaceMono-Bold',
  },
  sendGiftContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  inputWrap: {
    width: '100%',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    color: '#9999a5',
    fontSize: 18,
    top: 16,
    left: 16,
  },
});

export default styles;
