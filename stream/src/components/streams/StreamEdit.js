import React from "react"
import { connect } from "react-redux"
import { fetchStream, editStream } from "../../actions"
import StreamForm from "./StreamForm"
import _ from 'loadsh'

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        if (!this.props.stream) {  // this.props.stream 為一物件
            return <div>Loading</div>
        }

        return ( //initialValues為redux form保留字，可設相同名稱之field初始值
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(this.props.stream, 'title', 'description')}  //lodash pick 只取 object(this.props.stream) 中的 title / description
                    onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)