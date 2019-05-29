import React, { useState, useEffect } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";


const wysiwyg = (props) => {

    const [value, setValue] = useState('');
    const [tab, setTab] = useState('write');

    useEffect(() => {
        setValue(props.value)
    })

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    return (
        <div className="container">
            <ReactMde
                onChange={setValue}
                onTabChange={setTab}
                value={value}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                selectedTab={tab}
            />
        </div>
    );
}

export default wysiwyg
