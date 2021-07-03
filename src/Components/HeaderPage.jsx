import {PageHeader, Tabs} from "antd";

export default function HeaderPage (props){

    const {title} = props

    return <PageHeader
        className="header-page"
        title={title}
        footer={
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <Tabs>
                    <Tabs.TabPane tab="Пропуска" key={"tab1"} />
                </Tabs>
                {props.children}
            </div>
        } >
    </PageHeader>
}