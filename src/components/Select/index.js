import React, { useState } from 'react';
import { Select, Space } from 'antd';
function SelectItem({ data, ...props }) {
    const All = [
        {
            value: 'All',
            label: 'Tất cả',
        },
    ];

    const newData = data.map((item) => {
        const data = {
            value: item._id,
            label: item.nameLoaiSP || item.nameNCC,
        };
        return data;
    });

    const options = props.newOptions ? props.newOptions : [...All, ...newData];
    const [value, setValue] = useState(props.valueDefault);
    const handleChange = (value) => {
        props.onClick(value);
        setValue(value);
    };
    return (
        <Space wrap>
            <Select
                defaultValue={props.newOptions ? 'increase' : 'All'}
                style={{
                    width: props.width,
                }}
                value={value}
                onChange={handleChange}
                options={options}
            />
        </Space>
    );
}
export default SelectItem;
