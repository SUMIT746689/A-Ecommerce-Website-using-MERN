import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
const container = document.getElementById('root');

//store.subscribe(()=>{console.log(store.getState())})
const root = createRoot(container);
root.render(
<Provider store={store}>
    <App />
</Provider>
);