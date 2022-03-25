import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    display: 'inline-block',
    background: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '15px',
    fontFamily: 'inherit'
  }
}));

const Button = ({ color, text, onClick }) => {
  const classes = useStyles();
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={classes.btn}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
