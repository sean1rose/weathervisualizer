import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/main.css';
import {json} from 'd3-request';
import * as CONSTANTS from './constants';
// import secrets from './secrets';
// const {API} = secrets;

import LargeChart from './large-chart';
import SmallChart from './small-chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    };
    this.highlightX = this.highlightX.bind(this);
    this.processResults = this.processResults.bind(this);
  }

  componentWillMount() {
    // d3-request json function
    json(`${CONSTANTS.QUERY_PREFIX}?=${CONSTANTS.CITY_ID}&appid=${CONSTANTS.API}&units=imperial`, this.processResults);
  }

  highlightX(highlighted) {
    this.setState({highlighted});
  }

  processResults(error, queryResults) {
    if (error) {
      this.setState({error});
    }
    const data = CONSTANTS.KEYS.map(key => ({
      key,
      values: queryResults.list.map((d, i) => ({
        i,
        x: d.dt * 1000,
        y: d[key.key1] ? d[key.key1][key.key2] || 0 : 0
      }))
    })).reduce((prev, cur) => {
      return {...prev, [cur.key.name]: cur.values}
    }, {
      'city-name': (
        queryResults &&
        queryResults.city &&
        queryResults.city.name
      ) || 'Unknown'
    });
    this.setState({data});
  }
}
