import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import GoogleMapReact from 'google-map-react';
import dynamic from 'next/dynamic';


//Import Google maps noSSR
const GoogleMapReact = dynamic(
  () => import('google-map-react'),
  {
    ssr: false
  }
)


const GoogleMap = ({ children, ...props }) => (
  <div
    style={{ height: "100%", width: "100%" }}
  >
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'Forbiden key' }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;