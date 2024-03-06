import React from 'react';

//  passing component props and drilling
const Header = (props) => {
  return (
    <header
    //   style={{
    //     backgroundColor: 'red',
    //     color: 'white',
    //   }}
    >
      <h1>{props.title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: 'Default Title',
};

export default Header;
