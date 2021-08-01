import { connect } from "react-redux"
import { fetchStreams } from "../../actions"
import react from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'

class StreamList extends react.Component {
    componentDidMount() {
        this.props.fetchStreams()
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className='right floated content'>
                    <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            const avatar = faker.image.avatar()
            return (
                <div className='flex my-8 border hover:bg-gray-100' key={stream.id}>
                    {this.renderAdmin(stream)}
                    <img src={avatar} />
                    <div className='content ml-8 py-8'>
                        <Link to={`/streams/${stream.id}`} className='header text-3xl text-blue-600'>{stream.title}</Link>
                        <div className='mt-4 text-bold text-2xl text-gray-500'>{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to='/streams/new' className='google bg-blue-500 py-3 px-8 rounded-xl text-white text-xl hover:bg-white'>Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        return (
            < div>
                <div className='ui celled list'>
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams), //將object內所有東西加至新array
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)