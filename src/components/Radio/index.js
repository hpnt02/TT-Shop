import React, { useState } from 'react';
import { Flex, Radio } from 'antd';
function RadioItem({ data, ...props }) {
    const [value, setValue] = useState(props.valueDefault);
    const onChange = (e) => {
        props.onClick(e.target.value);
        setValue(e.target.value);
    };
    return (
        <div>
            {props.sort ? (
                <Flex vertical gap="middle">
                    <Radio.Group
                        onChange={onChange}
                        block
                        options={props.options}
                        defaultValue="increase"
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Flex>
            ) : (
                <Radio.Group onChange={onChange} value={value} style={{ margin: '10px 0' }} defaultValue="All">
                    <Radio value="All" style={{ lineHeight: '40px', paddingLeft: '10px', width: '100%' }}>
                        Tất cả
                    </Radio>
                    {data.map((value, index) => {
                        const values = value.nameNCC || value.nameLoaiSP;
                        return (
                            <Radio
                                key={index}
                                value={value._id}
                                style={{ lineHeight: '40px', paddingLeft: '10px', width: '100%' }}
                            >
                                {values}
                            </Radio>
                        );
                    })}
                </Radio.Group>
            )}
        </div>
    );
}
export default RadioItem;
