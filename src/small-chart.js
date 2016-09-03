import React, { Component } from 'react';
import moment from 'moment';
import {
	LineSeries,
	MarkSeries,
	makeWidthFlexible,
	XAxis,
	XYPlot,
	YAxis
} from 'react-vis';
import {makeLabelValues} from './large-chart';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

// import *as CONSTANTS from './constants.js'