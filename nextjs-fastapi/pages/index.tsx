import * as React from 'react';
import {Button} from '@mantine/core';

export const sum = (a: number, b: number) => a + b;

const Index: React.FC = () => {
  return (
    <div>
      <Button onClick={() => console.log('hey')}>Hello</Button>
    </div>
  );
};

export default Index;