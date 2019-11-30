import React, {useEffect, useState} from 'react';
import Chart from 'react-google-charts';
import {changeLanguage, t} from "client/components/Translator";
import {Button} from "reactstrap";
import {A} from 'hookrouter';
import Chat from "client/components/Chat";

export default function Home(props) {
    const [chartData, setChartData] = useState();


    useEffect(() => {
        loadChart();
        setInterval(loadChart, 10000)
    }, [])

    function loadChart() {
        props.api('/city/google-chart')
            .then(setChartData)
    }

    //setInterval(loadChart, 1000)
    //console.log(chartData)

    return <div>
        <Chat/>
        <h1  className="text-center">{t('Cities where Minterarians live')}</h1>
        {chartData && <Chart
            width={'100%'}
            chartType="GeoChart"
            data={chartData.data}
            options={{
                sizeAxis: {minValue: 0, maxValue: 100},
                //region: '155', // Western Europe
                displayMode: 'markers',
                backgroundColor:'#006994',
                defaultColor:'red',
                colorAxis: {colors: ['#009900', '#ff0000']}, // orange to blue
            }}
            mapsApiKey={chartData.key}
            rootProps={{'data-testid': '1'}}
        />}
        <hr/>
        <ol>
            <li><A href={'/mark'} className="btn btn-primary">{t('Find your city')}</A></li>
            <li>{t('Send any amount of MNT to the appropriate address')}</li>
            <li>{t('Your city will be displayed on map')}</li>
        </ol>



    </div>


}




