import React from 'react';
import { useQueryClient } from 'react-query';
import { Navigate, useSearchParams } from 'react-router-dom';

function SigninOauth2(props) {
    const [ searchParams ] = useSearchParams();
    const queryClient = useQueryClient();
    
    localStorage.setItem("accessToken", "Bearer " + searchParams.get("token"));
    queryClient.refetchQueries(["getPrincipal"]);

    return <Navigate to={"/main"}/>;
}

export default SigninOauth2;