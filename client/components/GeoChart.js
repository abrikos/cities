import Chart from "react-google-charts";
import React, {useEffect, useState} from "react";
import Loader from "client/components/Loader";

export default function GeoChart(props) {
    const [chartData, setChartData] = useState();


    useEffect(() => {
        loadChart();
        setInterval(loadChart, 10000)
    }, [])

    function loadChart() {
        props.api('/city/google-chart')
            .then(setChartData)
    }

    if(!chartData) return <Loader/>
    return <Chart
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
    />
}
