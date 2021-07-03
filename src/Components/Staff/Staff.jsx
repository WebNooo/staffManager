import {Button, Input, Row, Table, Tag} from "antd";
import {DeleteOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useContext, useEffect, useState} from "react";
import moment from "moment";
import {ContextApp} from "../../reducer";
import {getPositions, getStaff} from "../../Common/Api";
import {PositionAction, StaffAction} from "../../Common/Actions";
import HeaderPage from "../HeaderPage";
import CreateStaff from "./CreateStaff";

export default function Staff (){
    const {state, dispatch} = useContext(ContextApp)

    const [loading, setLoading] = useState(true)
    const [selectRows, setSelectRows] = useState([])
    const [searchData, setSearchData] = useState(null);
    const [addStaffVisible, setAddStaffVisible] = useState(false)

    useEffect(() => {

        getPositions().then(response => {
            if (response.status === 200) {
                //Position.set(dispatch, response.data)

                //в апи у всех позиций одинаковый ID
                PositionAction.set(dispatch, [
                    {id: 1, name: "Менеджер"},
                    {id: 2, name: "HR специалист"},
                    {id: 3, name: "Заместитель руководителя"},
                    {id: 4, name: "Руководитель"}
                ])
            }
            return getStaff()
        }).then(response => {
            if (response.status === 200) {
                StaffAction.set(dispatch, response.data)
                setLoading(false)
            }
        })

    }, [dispatch])

    const pass = [
        {
            name: "Действителен",
            color: "green",
            conditions: (date) => moment(new Date()).diff(moment(new Date(date)), 'month') < 5
        },
        {
            name: "Истекает срок",
            color: "yellow",
            conditions: (date) =>  moment(new Date()).diff(moment(new Date(date)), 'month') > 5 && moment(new Date()).diff(moment(new Date(date)), 'month') < 6
        },
        {
            name: "Просрочен",
            color: "red",
            conditions: (date) => moment(new Date()).diff(moment(new Date(date)), 'month') > 6
        }
    ]

    const tableColumns = [
        {
            title: 'ФИО сотрудника',
            dataIndex: 'fio',
            sorter: (a, b) => a.fio.localeCompare(b.fio)
        },
        {
            title: 'Должность',
            dataIndex: 'positionId',
            width: "15%",
            render: (positionId) => <>{state.positions.find(x => x.id === positionId).name}</>,
            sorter: (a, b) => a.positionId - b.positionId
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthDate',
            width: "15%",
            render: (date) => <>{moment(new Date(date)).format('DD.MM.YYYY')}</>,
            sorter: (a, b) => new Date(a.birthDate) - new Date(b.birthDate)
        },
        {
            title: 'Пропуск',
            dataIndex: 'actualPassDate',
            width: "10%",
            align: "center",
            render: (date) => {
                let item = pass.find(x => x.conditions(date) === true)
                return <Tag color={item.color}>{item.name}</Tag>
            },
            sorter: (a, b) => new Date(a.actualPassDate) - new Date(b.actualPassDate)
        },
    ]

    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            setSelectRows(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            setSelectRows(selectedRows);
        },
    };

    const search = (value) => {
        setLoading(true)
        setSearchData(state.staff.filter(x => Object.keys(x).some(index => {
            let fieldValue = x[index];

            if (index === "positionId")
                fieldValue = state.positions.find(d => d.id === fieldValue).name

            if (index === "actualPassDate")
                fieldValue = pass.find(x => x.conditions(fieldValue) === true).name

            return String(fieldValue).toLowerCase().includes(value.target.value.toLowerCase())}
        )))
        setLoading(false)
    }

    const removeStaff = () => {
        if (selectRows.length > 0) {
            StaffAction.remove(dispatch, selectRows)
            setSelectRows([])
        }
    }

    const addStaffToggle = () => setAddStaffVisible(!addStaffVisible)

    return <>

        <HeaderPage title="Сотрудники">
            <Button type="primary" onClick={addStaffToggle}><PlusOutlined /> Добавить сотрудника</Button>
        </HeaderPage>

        <div className="content">
            <Row className="staff-actions">
                <Input className="search" prefix={<SearchOutlined />} onChange={search} />  {selectRows.length > 0 && <Button onClick={removeStaff}><DeleteOutlined/> Удалить</Button>}
            </Row>
            <Table
                loading={loading}
                rowSelection={{...rowSelection}}
                rowKey="id"
                columns={tableColumns}
                dataSource={searchData === null ? state.staff : searchData}
            />
        </div>

        <CreateStaff visible={addStaffVisible} toggleVisible={addStaffToggle} />

   </>

}