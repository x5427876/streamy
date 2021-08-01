import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";


class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1066593249662-lg2j7vtsg9cqor2e7llcr9tel9b4qa1v.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon' />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className='ui red google button'>
                    <i className='google icon' />
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }  // props(isSignedIn) 賦值 state.auth.isSignedIn
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)