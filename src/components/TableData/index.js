import React, { useEffect, useState } from 'react';
import { Form, Image, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { createStyles } from 'antd-style';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                    ${antCls}-table-body,
                    ${antCls}-table-content {
                        scrollbar-width: thin;
                        scrollbar-color: unset;
                    }
                }
            }
        `,
    };
});

function TableData({ columnData, rowData, onClick, ...props }) {
    const [form] = Form.useForm();
    const [data, setData] = useState(rowData);
    const [editingKey, setEditingKey] = useState('');
    const { styles } = useStyle();
    useEffect(() => {
        setData(rowData); // Cập nhật data khi rowData thay đổi
    }, [rowData]); // Theo dõi rowData
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            props.onChange(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.MaNhanVien === 'Disabled User',
            // Column configuration not to be checked
            MaNhanVien: record.MaNhanVien,
        }),
    };

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();

            const newData = [...(data ?? [])];
            const index = newData?.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                onClick(newData[index]);
                setData(newData);
            } else {
                newData.push(row);
                setData(newData);
            }

            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        ...columnData,
        ...(props.operation !== false
            ? [
                  {
                      title: 'Chức năng',
                      dataIndex: 'operation',
                      render: (_, record) => {
                          const editable = isEditing(record);
                          return editable ? (
                              <span>
                                  <Typography.Link
                                      onClick={() => save(record.key)}
                                      style={{
                                          marginInlineEnd: 8,
                                      }}
                                  >
                                      Save
                                  </Typography.Link>
                                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                      Cancel
                                  </Popconfirm>
                              </span>
                          ) : (
                              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                  Edit
                              </Typography.Link>
                          );
                      },
                  },
              ]
            : []),
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                className={styles.customTable}
                scroll={{
                    x: 'max-content',
                }}
                style={{ border: '2px solid #aba7a7', borderRadius: '10px', backgroundColor: '#FFFFFF' }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                     position: ['bottomCenter'], 
                }}
                rowSelection={props.rowSelection ? { ...rowSelection } : undefined}
                locale={{ emptyText: 'không có dữ liệu' }}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
                expandable={
                    props.describe === true
                        ? {
                              expandedRowRender: (record) => (
                                  <>
                                      <p>
                                          <strong>Mô tả:</strong>
                                      </p>
                                      {record.describe?.split('\n').map((line, index) => (
                                          <p key={index}>{line}</p>
                                      ))}
                                      <p>
                                          <strong>Thành phần:</strong>
                                      </p>
                                      {record.ThanhPhan?.split('\n').map((line, index) => (
                                          <p key={index}>{line}</p>
                                      ))}
                                      <p>
                                          <strong>Hướng dẫn sử dụng:</strong>{' '}
                                      </p>
                                      <ul style={{ marginLeft: '20px' }}>
                                          {record.HuongDanSuDung?.split('\n').map((line, index) => (
                                              <li key={index}>{line}</li>
                                          ))}
                                      </ul>
                                      <p>
                                          <strong>Dung Tích:</strong> {record.DungTich}
                                      </p>
                                      <p>
                                          <strong>Hạn sử dụng:</strong> {record.HanSD}
                                      </p>
                                      <br />
                                      <div
                                          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
                                      >
                                          <Image
                                              src={record.Image.Image2}
                                              alt=""
                                              style={{
                                                  width: '100%',
                                                  maxWidth: '150px',
                                                  height:'150px'
                                              }}
                                          />
                                          <Image
                                              src={record.Image.Image3}
                                              alt=""
                                              style={{
                                                  width: '100%',
                                                  maxWidth: '150px',
                                                   height:'150px'
                                              }}
                                          />
                                          <Image
                                              src={record.Image.Image4}
                                              alt=""
                                              style={{
                                                  width: '100%',
                                                  maxWidth: '150px',
                                                   height:'150px'
                                              }}
                                          />
                                          <Image
                                              src={record.Image.Image5}
                                              alt=""
                                              style={{
                                                  width: '100%',
                                                  maxWidth: '150px',
                                                   height:'150px'
                                              }}
                                          />
                                      </div>
                                  </>
                              ),
                          }
                        : undefined
                }
            />
            
        </Form>
    );
}
export default TableData;
