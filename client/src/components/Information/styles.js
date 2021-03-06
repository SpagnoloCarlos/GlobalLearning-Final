const styles = {
  container: {
    mt: 3,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  box_title: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    bgcolor: '#030104',
    color: 'white',
    // borderRadius: '1em',
    // boxShadow: '0px 0px 20px 2px rgba(54,54,54,0.75)',
    height: '100%',
    width: '100%',
    p: 3,
    mt: 2,
    marginBottom: '20px',
  },
  box_information: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    // bgcolor: '#96a42f',
    background:
      'url("https://res.cloudinary.com/dw4hak4ok/image/upload/v1648650410/subtle-prism_i4hrta.svg")',
    borderRadius: '1em',
    boxShadow: '0px 0px 20px 2px rgba(54,54,54,0.75)',
    height: '100%',
    width: '80%',
    p: 3,
    marginBottom: '20px',
  },
  typography_h2: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: '3rem',
  },
  typography_body1: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: '0.5em',
    margin: '20px',
    fontWeight: '600',
    color: 'black',
    fontSize: '1.5rem',
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
    textAlign: 'justify',
  },
  box_cards: {
    display: 'flex',
    marginBottom: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;
