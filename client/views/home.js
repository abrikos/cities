import React, {useEffect, useState} from 'react';
import {t} from "client/components/Translator"
import {Button, Form, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPlus} from "@fortawesome/free-solid-svg-icons";
import CityMap from "client/components/CityMap";
import Address from "client/components/Address";
import Chart from 'react-google-charts';

export default function Home(props) {
    const [search, setSearch] = useState();
    const [found, setFound] = useState();
    const [city, setCity] = useState();
    const [chartData, setChartData] = useState();

    useEffect(()=>{
        loadChart();
    },[])

    function loadChart() {
        props.api('/city/google-chart')
            .then(setChartData)
    }

    function formToObject(form) {
        const array = Array.from(form.elements).filter(f => !!f.name)
        const obj = {};
        for (const a of array) {
            obj[a.name] = a.value
            //if (a.name === 'name' && !a.value) errors.push(a.name)
        }
        return obj
    }

    function formSubmit(e) {
        e.preventDefault();
        const form = formToObject(e.target);
        console.log(form)
        props.api(`/search/${form.search}`)
            .then(setFound)
    }

    function incrementCity(c) {
        props.api('/city/inc/'+c.id)
            .then(loadChart)
    }

    console.log(chartData)

    return <div>
        <hr/>
        <div className={'row'}>
            <div className={'col'}>
                <Form onSubmit={formSubmit}>
                    {t('Search Your site')}<Input name={'search'} defaultValue={'popovka'}/><Button color={'primary'}>{t('Search')}</Button>
                </Form>
                {found && <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>{t('Postal code')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('District')}</th>
                        <th>{t('Country')}</th>
                        <th>{t('Address')}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {found.map((f, i) => <tr key={i}>
                        <td>{f.code}</td>
                        <td>{f.name}</td>
                        <td>{f.district}</td>
                        <td>{f.country}</td>
                        <td><Address text={f.address}/></td>
                        <td className={city && city.id === f.id ? 'bg-success' : ''}>
                            <Button onClick={() => setCity(f)} size={'sm'}><FontAwesomeIcon icon={faEye}/></Button>
                            <Button onClick={() => incrementCity(f)} size={'sm'}><FontAwesomeIcon icon={faPlus}/></Button>
                            {f.count}
                        </td>
                    </tr>)}
                    </tbody>
                </table>}
                {city && <CityMap city={city}/>}
            </div>

            <div className={'col'}>
                {chartData && <Chart
                    width={'100%'}
                    height={'600px'}
                    chartType="GeoChart"
                    data={chartData.data}
                    options={{
                        sizeAxis: { minValue: 0, maxValue: 100 },
                        //region: '155', // Western Europe
                        displayMode: 'markers',
                        colorAxis: { colors: ['#e7711c', '#4374e0'] }, // orange to blue
                    }}
                    mapsApiKey={chartData.key}
                    rootProps={{ 'data-testid': '1' }}
                />}
            </div>
        </div>


    </div>;
}




