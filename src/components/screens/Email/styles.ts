import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',
    paddingTop: 50,
    flex: 1,
  },
  container: {
    paddingTop: 30,
    backgroundColor: '#131313',
    flex: 1,
    // height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#131313',
  },
  heading: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
  },
  subHeading: {
    color: '#919BA6',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'SpaceMono-Bold',
  },
  textInput: {
    borderColor: 'rgba(255,255,255,0.2)',
    marginTop: 20,
    borderRadius: 3,
    color: 'white',
    padding: 14,
    borderWidth: 1,
    fontFamily: 'SpaceMono-Bold',
  },
  buttonStyle: {
    marginVertical: 16,
    width: '90%',
    padding: 16,
    backgroundColor: 'white',
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono-Bold',
    textTransform: 'lowercase',
  },
});

export default styles;
