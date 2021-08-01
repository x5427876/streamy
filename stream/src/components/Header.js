import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () => {
    return (
        <div className='ui secondary pointing menu flex items-center '>
            <Link to='/' className='text-3xl text-blue-600 m-4 font-bold '>
                Streamy
            </Link>
            <div className=' right menu '>
                <Link to='/' className='item text-xl '>
                    All Streams
                </Link>
                <GoogleAuth />
            </div>
        </div >
    )
}

export default Header