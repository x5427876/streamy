import React from "react"
import { connect } from "react-redux"
import { fetchStream } from "../../actions"
import flv from 'flv.js'

class StreamShow extends React.Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef()
    }
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchStream(id)
        this.buildPlayer()
    }

    componentDidUpdate() {
        this.buildPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }
        const { id } = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    render() {
        if (!this.props.stream) {
            return (
                <div>Loading...</div>
            )
        }

        const { title, description } = this.props.stream

        return (  //直接傳props給子元件 => controls === controls={true}     ref={this.videoRef} 標示這個dom在其他地方可以操作
            <div>
                <video ref={this.videoRef}
                    style={{ width: '100%' }}
                    controls />
                <h1 className='text-blue-700 text-4xl mt-8 ml-4'>{title}</h1>
                <h5 className='text-gray-600 text-2xl mt-4 ml-4'>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)