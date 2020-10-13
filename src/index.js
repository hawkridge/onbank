import './assets/styles/style.css'
import Saver from './components/saver/saver'

const saver = new Saver('Saver');

const root = document.getElementById('root');

root.append(saver.render());

