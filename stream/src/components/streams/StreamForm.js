import react from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends react.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            )

        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return ( //把全部屬性傳給input
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (  //傳入submit後想執行的動作至redux foorm提供函數handleSubmit()內
            <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name='title' component={this.renderInput} label='Enter Title'/>
                <Field name='description' component={this.renderInput} label='Enter Descrpition' />
                <button className='ui button primary'>Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)

