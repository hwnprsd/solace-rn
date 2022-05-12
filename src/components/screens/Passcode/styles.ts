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
    marginTop: 20,
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonStyle: {
    width: '90%',
    padding: 16,
    marginVertical: 16,
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
