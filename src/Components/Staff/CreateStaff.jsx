import {Button, DatePicker, Drawer, Form, Input, message, Row, Select} from "antd";
import {ContextApp} from "../../reducer";
import {StaffAction} from "../../Common/Actions";
import {useContext} from "react";

export default function CreateStaff (props){
    const {visible, toggleVisible} = props

    const {state, dispatch} = useContext(ContextApp)
    const [form] = Form.useForm();

    const addStaff = (values) => {
        StaffAction.create(dispatch, {...values, birthDate: values.birthDate.valueOf(), actualPassDate: values.actualPassDate.valueOf()})
        form.resetFields();
        toggleVisible()
        message.success(`${values.fio} успешно добавлен(а) в отдел`)
    }

    return  <Drawer
        title="Добавить сотрудника"
        placement="right"
        closable={false}
        visible={visible}
        footer={
            <Row style={{float:"right"}}>
                <Button onClick={toggleVisible}>Отменить</Button>
                <Button onClick={() => {form.submit()}} style={{marginLeft: 5}} type="primary">Сохранить</Button>
            </Row>
        }>

        <Form layout="vertical" form={form} initialValues={{positionId: 1}} onFinish={addStaff}>
            <Form.Item name="fio" label="ФИО сотрудника" rules={[{required: true, message:"Укажите ФИО"}]}>
                <Input placeholder="Введите ФИО" />
            </Form.Item>

            <Form.Item name="birthDate" label="Дата рождения"  rules={[{required: true, message:"Укажите дату рождения"}]}>
                <DatePicker className="w-100" placeholder="Выберите дату" />
            </Form.Item>

            <Form.Item name="actualPassDate" label="Дата выдачи пропуска" rules={[{required: true, message:"Укажите дату выдачи пропуска"}]}>
                <DatePicker className="w-100" placeholder="Выберите дату" />
            </Form.Item>

            <Form.Item name="positionId" label="Должность">
                <Select>
                    {state.positions.map(x => <Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>)}
                </Select>
            </Form.Item>
        </Form>

    </Drawer>
}