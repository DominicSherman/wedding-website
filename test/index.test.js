import React from 'react';
import Chance from 'chance';

jest.mock('react-dom');
jest.mock('react-router-dom');
jest.mock('redux-thunk');
jest.mock('redux');
jest.mock('../src/reducer');
jest.mock('../src/other/registerServiceWorker');

const chance = new Chance();

describe('index', () => {});