import React from 'react';
import LoadingButton from 'components/LoadingButton';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(cleanup);
it('Renderización okay', () => {
  render(<LoadingButton text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});

it('Mostrar Texto cuando no este cargando', () => {
  render(<LoadingButton text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toHaveTextContent('hola');
});

it('No Mostrar texto cuando este cargando', () => {
  render(<LoadingButton text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('button-loading')).not.toHaveTextContent('hola');
});

it('Mostrar cargando cuando esta esperando', () => {
  render(<LoadingButton text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('loading-in-button')).toBeInTheDocument();
});

it('Esta disabled cuando disabled prop esta true', () => {
  render(<LoadingButton text='hola' loading={true} disabled={true} />);
  expect(screen.getByTestId('button-loading')).toHaveAttribute('disabled');
});

it('Esta  enabled cuando disabled prop esta  false', () => {
  render(<LoadingButton text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('button-loading')).not.toHaveAttribute('disabled');
});

it('loads the svg html when loading is activated', () => {
  render(<LoadingButton text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toMatchSnapshot();
});