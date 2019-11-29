import {Button, Form, Input} from "reactstrap";
import {t} from "client/components/Translator";
import Address from "client/components/Address";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import CityMap from "client/components/CityMap";
import React, {useState} from "react";

export default function MarkCity(props) {
    const [search, setSearch] = useState();
    const [found, setFound] = useState();
    const [city, setCity] = useState();

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
        props.api(`/search/${form.search}`)
            .then(setFound)
    }


    return <div className="row">
        <div className="col-md">
            <span>{t('Search Your site')}</span>
            <Form onSubmit={formSubmit} >
                <div className="row">
                <span className="col-9"><Input name={'search'} defaultValue={'popovka'} size={'sm'}/></span>
                <span className="col-3"><Button color={'primary'} size={'sm'}>{t('Search')}</Button></span>
                </div>
            </Form>
            {found && <table className="table table-hover mt-2">
                <thead>
                <tr>
                    <th className="d-none d-sm-table-cell">{t('Postal code')}</th>
                    <th>{t('Name')}</th>
                    <th className="d-none d-sm-table-cell">{t('District')}</th>
                    <th className="d-none d-sm-table-cell">{t('Country')}</th>
                    <th>{t('Address')}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {found.map((f, i) => <tr key={i}>
                    <td className="d-none d-sm-table-cell">{f.code}</td>
                    <td>{f.name}</td>
                    <td className="d-none d-sm-table-cell">{f.district}</td>
                    <td className="d-none d-sm-table-cell">{f.country}</td>
                    <td><Address text={f.address}/></td>
                    <td className={city && city.id === f.id ? 'bg-success' : ''}>
                        <Button onClick={() => setCity(f)} size={'sm'}><FontAwesomeIcon icon={faEye}/></Button>
                        {/*<Button onClick={() => incrementCity(f)} size={'sm'}><FontAwesomeIcon icon={faPlus}/></Button>
                            {f.count}*/}
                    </td>
                </tr>)}
                </tbody>
            </table>}
        </div>
        <div className="col-md">
            {city && <CityMap city={city}/>}
        </div>
    </div>
}
