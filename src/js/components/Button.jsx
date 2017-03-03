import React from 'react';
import { Link } from 'react-router';

export default function Button(props) {
  return <Link class="main-button" to={props.to}>{props.text}</Link>;
}
