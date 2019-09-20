import React, { useState, useEffect } from "react";
import { customRequest } from '../../lib/api/http/index';

const Index = (props) => {
    const { path, requestProp, page, onChange } = props,
        addRowNumber = 2,
        defaultState = {
            [requestProp]: [],
            selected: null,
            offset: 0,
            limit: 0,
        },
        [state, setState] = useState(defaultState);

    const getData = async (limit = addRowNumber, offset = 0) => {
        let tmp = await customRequest({ path: `${path}?limit=${limit}&offset=${offset}` });
        if (tmp && (tmp = tmp[requestProp])) {
            setState({ ...state, tmp, limit: state.limit + 2 })
            if (onChange) {
                if (typeof tmp == 'Objct') {
                    for (const key in tmp) {
                        if (tmp.hasOwnProperty(key)) {
                            const element = tmp[key];
                            onChange(key, element)
                        }
                    }
                }
                else
                    onChange(requestProp, tmp)
            }
        }
    }
    const setSelection = id => {
        const selected = state[requestProp] ? state[requestProp].find((e) => e._id == id) : null;

        setState({ ...state, selected })
    }

    useEffect(() => {
        getData(addRowNumber, 0)
    }, [])
    const reset = () => setState(defaultState)

    const loadMore = () => getData(state.limit + addRowNumber, state.offset)
    const childProps = { ...props, ...state, datas: state[requestProp], setSelection, loadMore }

    return (
        <>
            {page ? page(childProps) : ""}
        </>
    )
}

export default Index