import {useNavigate} from 'react-router-dom' ;
import { MdKeyboardBackspace } from "react-icons/md";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            onClick ={()=> navigate(-1)}
            className ='bg-white p-1 mr-2 text-md font-semibold rounded-full cursor-pointer shadow-xl/30'
        >
            <MdKeyboardBackspace className ='text-gray-500' size={20}/>

        </button>
    )
};


export default BackButton ;