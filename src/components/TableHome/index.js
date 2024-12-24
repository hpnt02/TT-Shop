import React from 'react';
import { Table } from 'antd';

function TableHome ({title, columns, data, ...props})  {
    return(
        <Table
        style={{ border:'2px solid #aba7a7', borderRadius:'10px', maxHeight:'1000px', backgroundColor:'white'}}
          columns={columns}
          dataSource={data}
          bordered
          title={() => (
            <h2 style={{ textAlign: 'center', fontSize: '15px' }}>
               {title} {props.online ? `(${data.length})` : ""}
            </h2>
        )}
        />
    )
};
export default TableHome;