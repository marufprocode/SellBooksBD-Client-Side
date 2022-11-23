import React from 'react';
import { toast } from 'react-hot-toast';

const Home = () => {
    return (
        <div>
            <h3>This is Home</h3>
            <button className="btn" onClick={()=> toast.success('Hello World')}>Toast</button>
        </div>
    );
};

export default Home;