import {Breadcrumb, BreadcrumbItem, Button, Form, Input} from "reactstrap";
import {t} from "client/components/Translator";
import Address from "client/components/Address";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import CityMap from "client/components/CityMap";
import React, {useState} from "react";
import {A} from 'hookrouter';

export default function MarkCity(props) {
    const [found, setFound] = useState();
    const [city, setCity] = useState();


    function formSubmit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        props.api(`/search/${form.search}`)
            .then(setFound)
    }


    return <div>
        <Breadcrumb>
            <BreadcrumbItem><A href={'/'}>{t('Home')}</A></BreadcrumbItem>
            <BreadcrumbItem>{t('Search city')}</BreadcrumbItem>
        </Breadcrumb>
        <div className="row">

        <div className="col-md">
            <Form onSubmit={formSubmit} >
                <div className="row">
                <span className="col-9"><Input name={'search'} bsSize={'sm'}/></span>
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
    </div>
}
