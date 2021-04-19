import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home'
import Detalhe from './pages/Detalhe';
import { Layout } from 'antd';


function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          
          <Route exact path="/">
            <Layout.Content style={{ padding: 40, margin: 10, background: "#fff" }}>
              <Home /> 
            </Layout.Content>
          </Route>
          
          <Route exact path="/:pais">
            <Layout.Content style={{ padding: 40, margin: 10, background: "#fff" }}>
              <Detalhe />
            </Layout.Content>
          </Route>

        </Layout>
      </Switch>
    </Router>
    
  );
}

export default App;
