import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';


class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  };

  renderList = () => {
    return this.props.list ?
      this.props.list.map((value) => (
        <ListItem
          key={ value._id }
          role={ undefined }
          dense
          button
          onClick={ this.onToggle(value._id) }
          style={{ padding: '0 15px 0 0' }}
        >
          <ListItemText
            id={ value._id }
            primary={ value.name }
          />
          <Checkbox
            checked={ this.state.checked.indexOf(value._id) !== -1 }
            tabIndex={ -1 }
            disableRipple
            inputProps={{ 'aria-labelledby': value._id }}
            color="primary"
          />
        </ListItem>
      ))
    : null;
  };

  onItemClick = () => {
    this.setState({ open: !this.state.open });
  };

  onToggle = (value) => () => {
    const { checked } = this.state;
    const currentNdx = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentNdx === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentNdx, 1)
    }

    this.setState(
      { checked: newChecked },
      () => this.props.handleFilters(newChecked)
    );
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
            { this.renderList() }
          </List>
        </Collapse>
      </List>
    );
  };
};


export default CollapseCheckbox;
