import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';


export default class CollapseRadio extends Component {
  state = {
    open: false,
    value: '0'
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  };

  renderList = () => {
    return this.props.list ?
      this.props.list.map((value) => (
        <FormControlLabel
          key={ value._id }
          value={ `${value._id}` }
          label={ value.name }
          control={ <Radio /> }
          style={{ marginRight: 0, paddingRight: '30px' }}
          classes={{ label: 'collapse-small-text' }}
        />
      ))
    : null;
  };

  onItemClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    this.props.handleFilters(value);
  };

  handleAngle = () => (
    this.state.open ?
      <FontAwesomeIcon icon={ faAngleUp } />
    :
      <FontAwesomeIcon icon={ faAngleDown } />
  );

  render() {
    return (
      <List
        component="div"
        disablePadding
        style={{ borderBottom: '1px solid #ddd' }}
      >
        <ListItem
          button
          onClick={ this.onItemClick }
          style={{
            padding: '10px 30px 10px 0',
            color: '#414141'
          }}
        >
          <ListItemText
            primary={ this.props.title }
            className="collapse-title"
          />

          { this.handleAngle() }
        </ListItem>
        <Collapse
          in={ this.state.open }
          timeout="auto"
          unmountOnExit
        >
          <List component="div">
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={ this.state.value }
              onChange={ this.handleChange }
            >
              { this.renderList() }
            </RadioGroup>
          </List>
        </Collapse>
      </List>
    );
  };
};
