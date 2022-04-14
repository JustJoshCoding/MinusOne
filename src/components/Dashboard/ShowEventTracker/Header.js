import PropTypes from 'prop-types';
import Button from './Button';
import { makeStyles } from "@material-ui/core/styles";
import { ProManageState } from '../../../ProManageContext';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  }
}));


const Header = ({ title, onAdd, showAdd }) => {
  const classes = useStyles();
  const {userInfo} = ProManageState();
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      {userInfo?.isAdmin && <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />}
    </header>
  )
}

Header.defaultProps = {
  title: 'Announcements',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
