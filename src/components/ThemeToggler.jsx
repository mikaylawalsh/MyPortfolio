import React from 'react';
// import DarkModeToggle from 'react-dark-mode-toggle';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

function ThemeToggler(props) {
  const { onClick } = props;
  const handleOnChange = (darkMode) => {
    darkMode.toggle();
    onClick();
  };

  return (
    <>
      <AppContext.Consumer>
        {(values) => (
          <div style={{ marginBottom: 8 }}>
            <Switch
              onChange={() => handleOnChange(values.darkMode)}
              checked={values.darkMode.value}
              size={50}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#bebebe"
              onColor="#bebebe"
              height={17}
              width={40}
              handleDiameter={23}
            />
          </div>
        )}
      </AppContext.Consumer>
    </>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};
ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
