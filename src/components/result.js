import React from 'react';

function Result(props) {
    function handleOnMouseOver() {
        selectText();
    }

    function selectText() {
        let range = new Range();
        let t = document.getElementById(props.id + '-txt');
        range.setStart(t, 0);
        range.setEnd(t, 1);
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
    }

    return (
        <div className={props.className}>
            <h6>{props.title}</h6>
            <div className="result" id={props.id}>
                <pre id={props.id + '-txt'} onMouseOver={handleOnMouseOver}>
                    {props.children}
                </pre>
            </div>
        </div>
    )
}

export default Result;