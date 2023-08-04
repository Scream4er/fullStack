import React from 'react';
import {useCurrentQuery} from "../../app/services/auth";

const Auth = ({children}: { children: React.ReactElement | null }) => {
    const {isLoading} = useCurrentQuery();

    if (isLoading) {
        return <span>Loading...</span>
    }
    return children;
};

export default Auth;
