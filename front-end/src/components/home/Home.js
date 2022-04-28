
import Carosoul from './Carosoul';
import loading from '../../images/loading.svg'

export default function Home() {

    return(
        <>
        {/* <button className=" bg-cyan-600 mx-6" disabled>
            <svg className="animate-spin h-5 w-5 mr-3 fill-black" viewBox="0 0 24 24">
                <img className='fill-inherit' src={loading} alt='loading'/>
            </svg>
                Processing...
        </button> */}
            <Carosoul/>
        </>
    )
}
