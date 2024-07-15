import axios from "axios";
import VerifiedUsersList from "../../components/common/VerifiedUsersList";
axios.defaults.withCredentials = true;

const Welcome = () => {   
    return (
        <div className="container">
            <VerifiedUsersList />
        </div>
    )
    
}

export default Welcome;
