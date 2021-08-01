import { Router, Route, Switch } from 'react-router-dom'
import StreamCreate from './streams/StreanCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'
import history from '../history'

const App = () => {  //Header沒有指定路徑所以在BrowserRouter內永遠顯示，Switch範圍內只會擇一路徑進入
    return (
        <div className='ui container'>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={StreamList} />
                        <Route path='/streams/new' exact component={StreamCreate} />
                        <Route path='/streams/delete/:id' exact component={StreamDelete} />
                        <Route path='/streams/:id' exact component={StreamShow} />
                        <Route path='/streams/edit/:id' exact component={StreamEdit} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App