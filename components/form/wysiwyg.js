import React, { useState, useEffect } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";


const wysiwyg = ({ value, onChange }) => {

    const [tab, setTab] = useState('write');


    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    return (
        <div className="container">
            <ReactMde
                onChange={(value) => onChange({ target: { value } })}
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
