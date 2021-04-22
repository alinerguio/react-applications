import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home'
import Favorites from './pages/Favorites';
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
          
          <Route exact path="/favorites">
            <Layout.Content style={{ padding: 40, margin: 10, background: "#fff" }}>
              <Favorites />
            </Layout.Content>
          </Route>

        </Layout>
      </Switch>
    </Router>
    
  );
}

export default App;
