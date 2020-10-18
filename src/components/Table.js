import React from 'react';

const Table = ({x,y}) => {

    const renderTd = (x,y)=>{
        const renderedHtml = [];
        for(let i=0;i<x;i++){
            renderedHtml.push(
                <td key={i} id={`ele_${y}_${i}`} className="ready">
                    &nbsp;
                </td>
            )
        }
        return renderedHtml;
    }
    const renderTr= (x) => {
        const renderedHtml = [];
        for(let i=0;i<x;i++){
            renderedHtml.push(
                <tr key={i}>
                    {renderTd(y,i)}
                </tr>
            )
        }
        return renderedHtml;
    }
    const renderTable=()=>{
        return (
            <table>
                <tbody>
                {renderTr(x)}
                </tbody>
            </table>
        )
    }
    return renderTable();
};

export default Table;