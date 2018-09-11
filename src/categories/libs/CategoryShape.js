import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  openIcon: PropTypes.string.isRequired,
  sleepIcon: PropTypes.string.isRequired,
})
