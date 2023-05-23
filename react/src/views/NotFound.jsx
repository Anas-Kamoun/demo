


import React from 'react';
import { Button, Result } from 'antd';

const App = () => (
  <Result
    status="404"
    title="404"
    subTitle="Désolé, la page que vous avez visitée n'existe pas."
    extra={<Button type="primary" href='/'>Retour accueil</Button>}
  />
);

export default App;