import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

/*
* 1 - дописать функцию onChangeTextCallback в SuperDebouncedInput
* 2 - дописать функцию sendQuery в HW14
* 3 - дописать функцию onChangeText в HW14
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW14 в HW5/pages/JuniorPlus
* */

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test2',
            {params: {find}}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    const [find, setFind] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<string[]>([])

    const sendQuery = (value: string) => {
        setLoading(true)
        getTechs(value)
            .then((res) => {
                // делает студент
                res && setTechs(res.data.techs)
                // сохранить пришедшие данные

                //
            })
    }

    const onChangeText = (value: string) => {
        setFind(value)
        // делает студент
        if (!value.length) {
            searchParams.delete('find')
            setSearchParams(searchParams)
        } else
            setSearchParams({
                ...Object.fromEntries(searchParams),
                find: value,
            })
        // добавить/заменить значение в квери урла
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery(params.find || '')
        setFind(params.find || '')
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>
            <hr/>
            <div className={s2.hw}>
                <div className={s.techContainer}>
                    <SuperDebouncedInput className={s.SuperDebouncedInputHW14}
                                         id={'hw14-super-debounced-input'}
                                         value={find}
                                         onChangeText={onChangeText}
                                         onDebouncedChange={sendQuery}
                    />
                    {isLoading === true ?
                        (<div id={'hw14-loading'} className={s.loading}>
                            '...ищем'
                        </div>)
                        :
                        <br/>}
                    {mappedTechs}
                </div>
            </div>
        </div>
    )
}

export default HW14
