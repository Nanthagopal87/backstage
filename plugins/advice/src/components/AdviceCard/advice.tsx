import { InfoCard } from '@backstage/core-components';
import { fetchApiRef, useApi } from '@backstage/core-plugin-api';
//import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';

export const AdviceCard = () => {
    // return <div>This is my adivce for the day</div>
    const [advice, setAdvice] = useState(null)
    const fetchApi = useApi(fetchApiRef)
    useEffect(() => {
        //fetch('https://api.adviceslip.com/advice').then((res) => {
        fetchApi.fetch('https://api.adviceslip.com/advice').then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setAdvice(data.slip.advice)
        })
    },[])
    return<InfoCard>{advice}</InfoCard>
    // return<InfoCard>This is my adivce for the day</InfoCard>
}