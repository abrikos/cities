import React, {useEffect, useState} from 'react';
import Chart from 'react-google-charts';

export default function Home(props) {
    const [chartData, setChartData] = useState();

    useEffect(() => {
        loadChart();
    }, [])

    function loadChart() {
        props.api('/city/google-chart')
            .then(setChartData)
    }


    return <div className="d-flex justify-content-center">
        {chartData && <Chart
            width={'80%'}
            chartType="GeoChart"
            data={chartData.data}
            options={{
                sizeAxis: {minValue: 0, maxValue: 100},
                //region: '155', // Western Europe
                displayMode: 'markers',
                colorAxis: {colors: ['#e7711c', '#4374e0']}, // orange to blue
            }}
            mapsApiKey={chartData.key}
            rootProps={{'data-testid': '1'}}
        />}
    </div>


}




